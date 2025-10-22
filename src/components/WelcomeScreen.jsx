import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen() {
  const { setCurrentScreen } = useGame();

  return (
    <div className="welcome-screen">
      <h1>👋 Merhaba! İkna Oyununa Başlayalım</h1>
      <button onClick={() => setCurrentScreen("scenario")}>Başlat</button>
    </div>
  );
}
