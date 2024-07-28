const express = require("express");
const router = express.Router();
const historicalDataController = require("../controllers/historicalDataController");

router.get("/", historicalDataController.getHistoricalData);

module.exports = router;
