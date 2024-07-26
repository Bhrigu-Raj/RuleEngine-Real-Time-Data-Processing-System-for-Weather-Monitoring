const express = require("express");
const mongoose = require("mongoose");
const weatherRoutes = require("./routes/weatherRoutes");
require("dotenv").config();

const app = express();

app.use("/api/weather", weatherRoutes);

mongoose.connect("mongodb://localhost/weatherApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
