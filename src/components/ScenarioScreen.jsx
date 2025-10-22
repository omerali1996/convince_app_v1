import React, { useEffect } from "react";
import { useGame } from "../context/GameContext";

export default function ScenariosScreen() {
  const { scenarios, fetchScenarios, selectScenario, loading, error } = useGame();

  useEffect(() => {
    fetchScenarios();
  }, []);

  if (loading) return <div style={loadingStyle}>Yükleniyor...</div>;
  if (error) return <div style={errorStyle}>{error}</div>;
  if (!scenarios.length) return <div style={emptyStyle}>Senaryo bulunamadı.</div>;

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Senaryolar</h2>
      <div style={gridStyle}>
        {scenarios.map((s) => (
          <div
            key={s.id}
            onClick={() => selectScenario(s)}
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
          >
            <h3 style={cardTitleStyle}>{s.name}</h3>
            <p style={cardTextStyle}>{s.story.length > 80 ? s.story.slice(0, 80) + "..." : s.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------
// Styles
// -------------------------
const containerStyle = {
  padding: 20,
  minHeight: "100vh",
  background: "#FFFDF7",
  fontFamily: '"Inter", "Roboto", sans-serif',
};

const titleStyle = {
  color: "#2B2B2B",
  fontSize: 28,
  marginBottom: 20,
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
};

const cardStyle = {
  padding: 20,
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const cardTitleStyle = {
  margin: 0,
  color: "#2B2B2B",
  fontSize: 18,
};

const cardTextStyle = {
  marginTop: 8,
  color: "#555",
  fontSize: 14,
  lineHeight: 1.4,
};

const loadingStyle = {
  padding: 20,
  textAlign: "center",
  fontSize: 18,
  color: "#2B2B2B",
};

const errorStyle = {
  padding: 20,
  textAlign: "center",
  fontSize: 18,
  color: "#D9534F",
};

const emptyStyle = {
  padding: 20,
  textAlign: "center",
  fontSize: 18,
  color: "#555",
};
