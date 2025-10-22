import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame } = useGame();

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>👋 Merhaba! İkna Oyununa Başlayalım</h1>
      <button
        onClick={startGame}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 18,
          cursor: "pointer",
          backgroundColor: "#0a74da",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        Başlat
      </button>
    </div>
  );
}
