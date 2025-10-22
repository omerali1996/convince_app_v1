import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { setStep } = useGame();

  const startGame = () => {
    setStep(1); // ScenarioListScreen'e geçiş
    window.location.href = "/scenarios"; // veya react-router ile yönlendirme
  };

  return (
    <div className="screen" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem" }}>👋 Merhaba! İkna Oyununa Başlayalım</h2>

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button className="btn btn-primary" onClick={startGame}>
          Başlat
        </button>
        <button className="btn btn-secondary" onClick={() => window.close()}>
          Çıkış
        </button>
      </div>
    </div>
  );
}
