import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { fetchScenarios } from "../api/api";

export default function ScenarioScreen({ next }) {
  const { scenarios, setScenarios, setCurrentScenarioIndex, setStep } = useGame();

  useEffect(() => {
    fetchScenarios().then(res => setScenarios(res.data));
  }, [setScenarios]);

  return (
    <div className="screen">
      <h2>Senaryo Seç</h2>
      {scenarios.map((s, i) => (
        <button key={i} onClick={() => {
          setCurrentScenarioIndex(i);
          setStep(2);
          next();
        }}>
          {s.ad}
        </button>
      ))}
    </div>
  );
}
