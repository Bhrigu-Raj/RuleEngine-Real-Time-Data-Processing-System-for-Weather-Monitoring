const express = require("express");
const ruleController = require("../controllers/ruleController");

const router = express.Router();

router.post("/create_rule", ruleController.createRule);
router.post("/combine_rules", ruleController.combineRules);
router.post("/evaluate_rule", ruleController.evaluateRule);

module.exports = router;
