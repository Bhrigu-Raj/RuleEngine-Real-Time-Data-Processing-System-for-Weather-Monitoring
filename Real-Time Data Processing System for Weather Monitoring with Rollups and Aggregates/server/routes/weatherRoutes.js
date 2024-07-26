const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();

router.get("/current", weatherController.getCurrentWeather);

module.exports = router;
