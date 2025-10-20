import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen({ setScreen }) {
  return (
    <div className="screen">
      <h2>👋 Merhaba! İkna Oyununa Başlayalım</h2>
      <button onClick={() => setScreen("scenario")}>Başlat</button>
      <button style={{background: "#ef4444"}} onClick={() => window.close()}>Çıkış</button>
    </div>
  );
}
