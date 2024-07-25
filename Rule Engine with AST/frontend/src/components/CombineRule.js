import React, { useState } from "react";

const CombineRules = () => {
  const [ruleIds, setRuleIds] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/rules/combine_rules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ruleIds: ruleIds.split(",").map((id) => id.trim()),
        }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error combining rules:", error);
    }
  };

  return (
    <div>
      <h2>Combine Rules</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ruleIds}
          onChange={(e) => setRuleIds(e.target.value)}
          placeholder="Enter rule IDs separated by commas"
        />
        <button type="submit">Combine Rules</button>
      </form>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default CombineRules;
