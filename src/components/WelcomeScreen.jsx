import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { startGame } = useGame();

  return (
    <div className="screen">
      <h1>👋 Merhaba! İkna Oyununa Başlayalım</h1>
      <button onClick={startGame}>Başlat</button>
    </div>
  );
}
