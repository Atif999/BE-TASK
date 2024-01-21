const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const vendingRoutes = require("./routes/vendingRoutes");
const { connectDatabase } = require("./utils/connectDB");
require("dotenv").config();

const app = express();

if (process.env.NODE_ENV === "prod") {
  connectDatabase();
}

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/vending", vendingRoutes);

module.exports = app;
