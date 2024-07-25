const {
  createRuleAST,
  combineRulesAST,
  evaluateAST,
} = require("../utils/astUtils");
const Rule = require("../models/Rule");

exports.createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = createRuleAST(ruleString);
    const rule = new Rule({ ast });
    await rule.save();
    res.json(rule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.combineRules = async (req, res) => {
  try {
    const { ruleIds } = req.body;
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    const combinedAST = combineRulesAST(rules.map((r) => r.ast));
    res.json(combinedAST);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.evaluateRule = (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateAST(ast, data);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
