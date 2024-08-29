const express = require("express");
const {
  enrolledCollection,
  classesCollection,
  appliedCollection,
  userCollection,
} = require("../models/collections");
const verifyJWT = require("../middleware/auth");
const { verifyInstructor, verifyAdmin } = require("../middleware/verifyRole");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/popular_classes", async (req, res) => {
  const result = await classesCollection
    .find()
    .sort({ totalEnrolled: -1 })
    .limit(6)
    .toArray();
  res.send(result);
});

router.get("/popular-instructors", async (req, res) => {
  const pipeline = [
    {
      $group: {
        _id: "$instructorEmail",
        totalEnrolled: { $sum: "$totalEnrolled" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "instructor",
      },
    },
    {
      $project: {
        _id: 0,
        instructor: {
          $arrayElemAt: ["$instructor", 0],
        },
        totalEnrolled: 1,
      },
    },
    {
      $sort: {
        totalEnrolled: -1,
      },
    },
    {
      $limit: 6,
    },
  ];
  const result = await classesCollection.aggregate(pipeline).toArray();
  res.send(result);
});

router.get("/admin-stats", verifyJWT, verifyAdmin, async (req, res) => {
  const approvedClasses = (
    await classesCollection.find({ status: "approved" }).toArray()
  ).length;
  const pendingClasses = (
    await classesCollection.find({ status: "pending" }).toArray()
  ).length;
  const instructors = (
    await userCollection.find({ role: "instructor" }).toArray()
  ).length;
  const totalClasses = (await classesCollection.find().toArray()).length;
  const totalEnrolled = (await enrolledCollection.find().toArray()).length;
  // const totalRevenue = await paymentCollection.find().toArray();
  // const totalRevenueAmount = totalRevenue.reduce((total, current) => total + parseInt(current.price), 0);
  const result = {
    approvedClasses,
    pendingClasses,
    instructors,
    totalClasses,
    totalEnrolled,
  };
  res.send(result);
});

router.get("/instructors", async (req, res) => {
  const result = await userCollection.find({ role: "instructor" }).toArray();
  res.send(result);
});

router.get("/enrolled-classes/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };
  const pipeline = [
    {
      $match: query,
    },
    {
      $lookup: {
        from: "classes",
        localField: "classesId",
        foreignField: "_id",
        as: "classes",
      },
    },
    {
      $unwind: "$classes",
    },
    {
      $lookup: {
        from: "users",
        localField: "classes.instructorEmail",
        foreignField: "email",
        as: "instructor",
      },
    },
    {
      $project: {
        _id: 0,
        classes: 1,
        instructor: {
          $arrayElemAt: ["$instructor", 0],
        },
      },
    },
  ];
  const result = await enrolledCollection.aggregate(pipeline).toArray();
  res.send(result);
});

router.post("/as-instructor", async (req, res) => {
  const data = req.body;
  const result = await appliedCollection.insertOne(data);
  res.send(result);
});
router.get("/applied-instructors/:email", async (req, res) => {
  const email = req.params.email;
  const result = await appliedCollection.findOne({ email });
  res.send(result);
});

module.exports = router;
