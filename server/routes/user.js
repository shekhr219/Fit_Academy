const express = require("express");
const { userCollection } = require("../models/collections");
const verifyJWT = require("../middleware/auth");
const { verifyAdmin } = require("../middleware/verifyRole");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.post("/new-user", async (req, res) => {
  const newUser = req.body;
  const result = await userCollection.insertOne(newUser);
  res.send(result);
});

router.post("/api/set-token", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
});

router.get("/users", async (req, res) => {
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userCollection.findOne({ _id: new ObjectId(id) });
  res.send(user);
});

router.get("/user/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const result = await userCollection.findOne({ email });
  res.send(result);
});

router.delete("/delete-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

router.put("/update-user/:id", verifyJWT, verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  const updateDoc = {
    $set: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.option,
      address: updatedUser.address,
      phone: updatedUser.phone,
      about: updatedUser.about,
      photoUrl: updatedUser.photoUrl,
      skills: updatedUser.skills || null,
    },
  };
  const result = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    updateDoc,
    { upsert: true }
  );
  res.send(result);
});

module.exports = router;
