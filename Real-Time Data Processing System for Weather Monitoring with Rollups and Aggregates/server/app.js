const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { port, mongoUri } = require("./config/config");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", weatherRoutes);

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
