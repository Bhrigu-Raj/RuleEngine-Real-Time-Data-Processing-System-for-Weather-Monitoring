class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function createRuleAST(ruleString) {
  const tokens = tokenize(ruleString);
  let index = 0;

  function parseExpression() {
    let node = parseTerm();
    while (
      index < tokens.length &&
      (tokens[index] === "OR" || tokens[index] === "||")
    ) {
      const operator = tokens[index];
      index++;
      node = new Node("operator", operator, node, parseTerm());
    }
    return node;
  }

  function parseTerm() {
    let node = parseFactor();
    while (
      index < tokens.length &&
      (tokens[index] === "AND" || tokens[index] === "&&")
    ) {
      const operator = tokens[index];
      index++;
      node = new Node("operator", operator, node, parseFactor());
    }
    return node;
  }

  function parseFactor() {
    if (tokens[index] === "(") {
      index++;
      const node = parseExpression();
      if (tokens[index] === ")") {
        index++;
      }
      return node;
    }
    return parseCondition();
  }

  function parseCondition() {
    const leftOperand = tokens[index];
    index++;
    const operator = tokens[index];
    index++;
    const rightOperand = tokens[index];
    index++;
    const condition = {};
    condition[leftOperand] = operator + rightOperand;
    return new Node("operand", condition);
  }

  function tokenize(input) {
    const regex = /\s*([()<>='"]|\bAND\b|\bOR\b|\w+)\s*/g;
    return input.split(regex).filter((token) => token.trim());
  }

  return parseExpression();
}

function combineRulesAST(rules) {
  if (rules.length === 0) return null;
  if (rules.length === 1) return rules[0];

  let combinedAST = rules[0];
  for (let i = 1; i < rules.length; i++) {
    combinedAST = new Node("operator", "OR", combinedAST, rules[i]);
  }

  return combinedAST;
}

function evaluateAST(node, data) {
  if (node.type === "operand") {
    const [key, condition] = Object.entries(node.value)[0];
    const [operator, threshold] = condition
      .match(/(>=|<=|>|<|=)?(.*)/)
      .slice(1);

    switch (operator) {
      case ">":
        return data[key] > parseFloat(threshold);
      case "<":
        return data[key] < parseFloat(threshold);
      case ">=":
        return data[key] >= parseFloat(threshold);
      case "<=":
        return data[key] <= parseFloat(threshold);
      case "=":
        return data[key] === threshold;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else if (node.type === "operator") {
    const leftValue = evaluateAST(node.left, data);
    const rightValue = evaluateAST(node.right, data);
    switch (node.value) {
      case "AND":
      case "&&":
        return leftValue && rightValue;
      case "OR":
      case "||":
        return leftValue || rightValue;
      default:
        throw new Error(`Unknown operator: ${node.value}`);
    }
  }
}

module.exports = { Node, createRuleAST, combineRulesAST, evaluateAST };
