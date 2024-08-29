const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDB } = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const classRoutes = require("./routes/class");
const cartRoutes = require("./routes/cart");
const enrolledRoutes = require("./routes/enrolled");
const paymentRoutes = require("./routes/payment");

app.use(userRoutes);
app.use(classRoutes);
app.use(cartRoutes);
app.use(enrolledRoutes);
app.use(paymentRoutes);
// app.get("/", (req, res) => {
//   res.send("Hello shekhar");
// });
// Connect to DB
connectToDB();

const port = process.env.PORT || 3000;
app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Server encountered an error:", err);
  });
