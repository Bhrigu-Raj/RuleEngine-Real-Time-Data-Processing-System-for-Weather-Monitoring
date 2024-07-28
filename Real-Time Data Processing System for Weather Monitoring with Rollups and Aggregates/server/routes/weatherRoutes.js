const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/weather-summaries", weatherController.getWeatherSummaries);
router.get("/weather-alerts", weatherController.getWeatherAlerts);

module.exports = router;
