const express = require("express");
const { cartCollection, classesCollection } = require("../models/collections");
const verifyJWT = require("../middleware/auth");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/add-to-cart", verifyJWT, async (req, res) => {
  const newCartItem = req.body;
  const result = await cartCollection.insertOne(newCartItem);
  res.send(result);
});
router.get("/cart-item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const email = req.query.email;
  const query = { classId: id, userMail: email };
  const projection = { classId: 1 };
  const result = await cartCollection.findOne(query, {
    projection: projection,
  });
  res.send(result);
});

router.get("/cart/:email", verifyJWT, async (req, res) => {
  const email = req.params.email;
  const query = { userMail: email };
  const projection = { classId: 1 };
  const carts = await cartCollection
    .find(query, { projection: projection })
    .toArray();
  const classIds = carts.map((cart) => new ObjectId(cart.classId));
  const query2 = { _id: { $in: classIds } };
  const result = await classesCollection.find(query2).toArray();
  res.send(result);
});

router.delete("/delete-cart-item/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const query = { classId: id };
  const result = await cartCollection.deleteOne(query);
  res.send(result);
});

module.exports = router;
