import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";

export default function ScenariosScreen() {
  const { scenarios, fetchScenarios, selectScenario, loading, error } = useGame();

  useEffect(() => {
    fetchScenarios();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (!scenarios.length) return <div>Senaryo bulunamadı.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Senaryolar</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => selectScenario(s)}
            style={{
              padding: "10px 15px",
              fontSize: 16,
              cursor: "pointer",
              backgroundColor: "#0a74da",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
