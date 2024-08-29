const { client } = require("../config/db");
const express = require("express");
const stripe = require("stripe")(process.env.PAYMENT_SECRET);
const {
  paymentCollection,
  classesCollection,
  cartCollection,
  enrolledCollection,
} = require("../models/collections");
const verifyJWT = require("../middleware/auth");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/create-payment-intent", verifyJWT, async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price) * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post("/payment-info", verifyJWT, async (req, res) => {
  const session = client.startSession();
  session.startTransaction();

  try {
    const paymentInfo = req.body;
    const classesId = paymentInfo.classesId;
    const userEmail = paymentInfo.userEmail;
    const singleClassId = req.query.classId;

    if (!Array.isArray(classesId) || !userEmail || !paymentInfo.transactionId) {
      return res.status(400).send({ error: "Invalid input" });
    }

    let query;
    if (singleClassId) {
      query = { classId: singleClassId, userMail: userEmail };
    } else {
      query = { classId: { $in: classesId }, userMail: userEmail };
    }

    const classIds = classesId.map((id) => new ObjectId(id));
    const classesQuery = { _id: { $in: classIds } };

    const classes = await classesCollection
      .find(classesQuery)
      .toArray({ session });

    if (classes.some((cls) => cls.availableSeats < 1)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({ error: "Not enough available seats" });
    }

    const newEnrolledData = {
      userEmail,
      classesId: classIds,
      transactionId: paymentInfo.transactionId,
    };

    const updatedResult = await classesCollection.updateMany(
      { ...classesQuery, availableSeats: { $gte: 1 } },
      {
        $inc: {
          totalEnrolled: 1,
          availableSeats: -1,
        },
      },
      { session }
    );

    if (updatedResult.matchedCount !== classesId.length) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).send({
        error: "Seats are no longer available for one or more classes.",
      });
    }

    const enrolledResult = await enrolledCollection.insertOne(newEnrolledData, {
      session,
    });

    const deletedResult = await cartCollection.deleteMany(query, { session });

    const paymentResult = await paymentCollection.insertOne(paymentInfo, {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
  } catch (err) {
    console.error("Error processing payment info:", err);

    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();

    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/payment-history/:email", async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };
  const result = await paymentCollection
    .find(query)
    .sort({ date: -1 })
    .toArray();
  res.send(result);
});

router.get("/payment-history-length/:email", async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };
  const total = await paymentCollection.countDocuments(query);
  res.send({ total });
});

module.exports = router;
