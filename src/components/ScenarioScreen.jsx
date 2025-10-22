import React from "react";
import { useGame } from "../context/GameContext";

export default function ScenarioScreen() {
  const { cases, setCurrentScreen, setCurrentCaseIndex } = useGame();

  const selectScenario = (index) => {
    setCurrentCaseIndex(index);
    setCurrentScreen("game");
  };

  return (
    <div className="scenario-screen">
      <h2>Senaryolar</h2>
      {cases.map((c, idx) => (
        <button key={idx} onClick={() => selectScenario(idx)}>
          {c.name || `Senaryo ${idx + 1}`}
        </button>
      ))}
    </div>
  );
}
