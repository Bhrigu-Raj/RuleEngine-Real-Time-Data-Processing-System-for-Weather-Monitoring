const express = require("express");
const router = express.Router();
const currentWeatherController = require("../controllers/currentWeatherController");

router.get("/", currentWeatherController.getCurrentWeather);

module.exports = router;
