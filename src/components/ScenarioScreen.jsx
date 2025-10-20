import React from "react";
import { useGame } from "../context/GameContext";

export default function ScenarioScreen({ setScreen }) {
  const { cases, setCurrentCaseIndex } = useGame();

  return (
    <div className="screen">
      <h2>Senaryolar</h2>
      {cases.map((sc, idx) => (
        <button key={idx} onClick={() => {
          setCurrentCaseIndex(idx);
          setScreen("game");
        }}>
          {sc.ad}
        </button>
      ))}
      <button style={{background: "#ef4444"}} onClick={() => window.close()}>Çıkış</button>
    </div>
  );
}
