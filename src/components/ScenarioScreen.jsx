import React, { useEffect, useState, useContext } from "react";
import { getScenarios } from "../api";
import { GameContext } from "../context/GameContext";

export default function ScenarioScreen() {
  const [scenarios, setScenarios] = useState({});
  const { startGame, goBack } = useContext(GameContext);

  useEffect(() => {
    getScenarios().then(setScenarios);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={goBack}>Geri</button>
      <h3>Senaryolar</h3>
      <div>
        {Object.entries(scenarios).map(([id, s]) => (
          <button key={id} onClick={() => startGame(s)} style={{ display: "block", margin: "10px 0", width: "100%" }}>
            {s["Senaryo Adı"]}
          </button>
        ))}
      </div>
    </div>
  );
}
