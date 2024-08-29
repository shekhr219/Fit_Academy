const { userCollection } = require("../models/collections");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await userCollection.findOne({ email });
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).send({ error: true, message: "Unauthorized access" });
  }
};

const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await userCollection.findOne({ email });
  if (user.role === "instructor" || user.role === "admin") {
    next();
  } else {
    res.status(401).send({ error: true, message: "Unauthorized access" });
  }
};

module.exports = { verifyAdmin, verifyInstructor };
