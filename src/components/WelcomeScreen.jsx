import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame } = useGame();

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>👋 Merhaba!</h1>
        <p style={subtitle}>İkna Oyununa Başlayalım</p>
        <button style={button} onClick={startGame}>
          Başlat
        </button>
      </div>
    </div>
  );
}

// Styles
const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to bottom, #FFFDF7, #FFF3E3)",
  fontFamily: '"Inter", "Roboto", sans-serif',
  padding: 20,
};

const card = {
  textAlign: "center",
  padding: 40,
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
  maxWidth: 400,
  width: "100%",
};

const title = {
  margin: 0,
  fontSize: 32,
  color: "#2B2B2B",
};

const subtitle = {
  margin: "16px 0 32px",
  fontSize: 18,
  color: "#555",
};

const button = {
  padding: "12px 24px",
  fontSize: 16,
  backgroundColor: "#FFB84C",
  color: "#1E1E1E",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};
