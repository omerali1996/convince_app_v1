import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";

export default function ScenariosScreen() {
  const { scenarios, fetchScenarios, selectScenario, loading, error } = useGame();

  useEffect(() => {
    fetchScenarios();
  }, []);

  if (loading) return <div style={status}>Yükleniyor...</div>;
  if (error) return <div style={status}>{error}</div>;
  if (!scenarios.length) return <div style={status}>Senaryo bulunamadı.</div>;

  return (
    <div style={container}>
      <h2 style={title}>Senaryolar</h2>
      <div style={list}>
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => selectScenario(s)}
            style={button}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Styles
const container = {
  minHeight: "100vh",
  padding: 30,
  background: "#FFFDF7",
  fontFamily: '"Inter", "Roboto", sans-serif',
};

const title = {
  fontSize: 28,
  color: "#2B2B2B",
  marginBottom: 20,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const button = {
  padding: "12px 20px",
  fontSize: 16,
  cursor: "pointer",
  backgroundColor: "#0a74da",
  color: "white",
  border: "none",
  borderRadius: 8,
  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s",
};

button[":hover"] = {
  transform: "translateY(-2px)",
  boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
};

const status = {
  padding: 20,
  textAlign: "center",
  fontSize: 18,
  color: "#555",
};
