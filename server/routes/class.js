const express = require("express");
const { classesCollection, userCollection } = require("../models/collections");
const verifyJWT = require("../middleware/auth");
const { verifyInstructor, verifyAdmin } = require("../middleware/verifyRole");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.post("/new-class", async (req, res) => {
  const newClass = req.body;
  newClass.availableSeats = parseInt(newClass.availableSeats);
  const result = await classesCollection.insertOne(newClass);
  res.send(result);
});

router.get("/classes/:email", verifyJWT, verifyInstructor, async (req, res) => {
  const email = req.params.email;
  const result = await classesCollection
    .find({ instructorEmail: email })
    .toArray();
  res.send(result);
});

router.get("/classes", async (req, res) => {
  const result = await classesCollection.find({ status: "approved" }).toArray();
  res.send(result);
});

router.get("/classes-manage", async (req, res) => {
  const result = await classesCollection.find().toArray();
  res.send(result);
});

router.put("/change-status/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const { status, reason } = req.body;
  const updateDoc = {
    $set: { status, reason },
  };
  const result = await classesCollection.updateOne(
    { _id: new ObjectId(id) },
    updateDoc,
    { upsert: true }
  );
  res.send(result);
});

router.get("/approved-classes", async (req, res) => {
  const result = await classesCollection.find({ status: "approved" }).toArray();
  res.send(result);
});

router.get("/instructors", async (req, res) => {
  const query = { role: "instructor" };
  const result = await userCollection.find(query).toArray();
  res.send(result);
});

router.put(
  "/update-class/:id",
  verifyJWT,
  verifyInstructor,
  async (req, res) => {
    const id = req.params.id;
    const updatedClass = req.body;
    const updateDoc = {
      $set: {
        name: updatedClass.name,
        description: updatedClass.description,
        price: updatedClass.price,
        availableSeats: parseInt(updatedClass.availableSeats),
        videoLink: updatedClass.videoLink,
        status: "pending",
      },
    };
    const result = await classesCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc,
      { upsert: true }
    );
    res.send(result);
  }
);

router.get("/class/:id", async (req, res) => {
  const id = req.params.id;
  const result = await classesCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});

module.exports = router;
