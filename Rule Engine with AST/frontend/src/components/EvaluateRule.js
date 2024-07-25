import React, { useState } from "react";

const EvaluateRule = () => {
  const [ast, setAst] = useState("");
  const [data, setData] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/rules/evaluate_rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ast, data: JSON.parse(data) }),
      });
      const resData = await res.json();
      setResponse(resData);
    } catch (error) {
      console.error("Error evaluating rule:", error);
    }
  };

  return (
    <div>
      <h2>Evaluate Rule</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={ast}
          onChange={(e) => setAst(e.target.value)}
          placeholder="Enter AST"
        />
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data as JSON"
        />
        <button type="submit">Evaluate Rule</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default EvaluateRule;
