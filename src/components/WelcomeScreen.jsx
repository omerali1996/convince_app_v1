import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame } = useGame();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#FFFDF7",
      fontFamily: '"Inter", sans-serif'
    }}>
      <div style={{
        textAlign: "center",
        background: "#fff",
        padding: "40px 30px",
        borderRadius: 12,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{ color: "#2B2B2B", fontSize: "2rem" }}>👋 Merhaba! İkna Oyununa Başlayalım</h1>
        <button
          onClick={startGame}
          style={{
            marginTop: 30,
            padding: "12px 30px",
            fontSize: 18,
            cursor: "pointer",
            backgroundColor: "#FFB84C",
            color: "#1E1E1E",
            border: "none",
            borderRadius: 8,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transition: "all 0.2s"
          }}
          onMouseOver={(e)=> e.currentTarget.style.transform="translateY(-2px)"}
          onMouseOut={(e)=> e.currentTarget.style.transform="translateY(0)"}
        >
          Başlat
        </button>
      </div>
    </div>
  );
}
