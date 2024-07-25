const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
  left: { type: mongoose.Schema.Types.Mixed, default: null },
  right: { type: mongoose.Schema.Types.Mixed, default: null },
});

const ruleSchema = new mongoose.Schema({
  ast: { type: nodeSchema, required: true },
});

module.exports = mongoose.model("Rule", ruleSchema);
