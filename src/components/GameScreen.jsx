import React from "react";
import { useGame } from "../context/GameContext";

export default function ScenarioListScreen() {
  const { cases, setStep } = useGame();

  if (!cases.length) return <p>Senaryolar yükleniyor...</p>;

  const selectScenario = (index) => {
    setStep(1); // Game ekranını başlat
    localStorage.setItem("currentScenarioIndex", index); // Seçilen senaryoyu kaydet
    window.location.href = "/game"; // Veya router ile yönlendirme
  };

  return (
    <div className="screen">
      <h2>📜 Senaryolar</h2>
      <div className="screen-content" style={{ flexDirection: "column", gap: "10px" }}>
        {cases.map((scenario, index) => (
          <button
            key={index}
            className="btn btn-primary"
            onClick={() => selectScenario(index)}
            style={{ width: "100%", padding: "10px 0" }}
          >
            {scenario["Senaryo Adı"]}
          </button>
        ))}
      </div>
    </div>
  );
}
