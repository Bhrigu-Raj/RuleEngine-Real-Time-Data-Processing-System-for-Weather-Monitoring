const express = require("express");
const bodyParser = require("body-parser");
const ruleRoutes = require("./routes/ruleRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api/rules", ruleRoutes);

module.exports = app;
