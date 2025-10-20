
import React, { useEffect, useState } from "react";
import { fetchScenarios, fetchScenarioDetail } from "../api/chatApi";

const ScenarioScreen = ({ onSelect }) => {
  const [scenarios, setScenarios] = useState({});

  useEffect(() => {
    fetchScenarios().then(setScenarios);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Senaryolar</h2>
      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {Object.entries(scenarios).map(([id, scenario]) => (
          <button
            key={id}
            style={{ display: "block", margin: "10px 0", padding: 10, fontSize: 16 }}
            onClick={async () => {
              const detail = await fetchScenarioDetail(id);
              onSelect(detail);
            }}
          >
            {id}: {scenario["Senaryo Adı"]}
          </button>
        ))}
      </div>
      <button onClick={() => window.close()} style={{ marginTop: 20, padding: 10 }}>Çıkış</button>
    </div>
  );
};

export default ScenarioScreen;
