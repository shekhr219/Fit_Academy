const { client } = require("../config/db");

const database = client.db("fit-academy");
const userCollection = database.collection("users");
const classesCollection = database.collection("classes");
const cartCollection = database.collection("cart");
const enrolledCollection = database.collection("enrolled");
const paymentCollection = database.collection("payments");
const appliedCollection = database.collection("applied");

module.exports = {
  userCollection,
  classesCollection,
  cartCollection,
  enrolledCollection,
  paymentCollection,
  appliedCollection,
};
