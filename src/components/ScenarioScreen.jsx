import React from "react";
import { useGame } from "../context/GameContext";

export default function ScenariosScreen() {
  const { cases, loading, error, selectScenario } = useGame();

  if (loading) return <div>Senaryolar yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!cases.length) return <div>Senaryo bulunamadı</div>;

  return (
    <div className="screen">
      <h2>Senaryo Seçiniz</h2>
      <ul>
        {cases.map((scenario, idx) => (
          <li key={idx}>
            <button onClick={() => selectScenario(idx)}>
              {scenario.name || `Senaryo ${idx + 1}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
