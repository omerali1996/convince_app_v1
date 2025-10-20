import React from "react";
import { useGame } from "../context/GameContext";

export default function WelcomeScreen({ next }) {
  const { setStep } = useGame();
  return (
    <div className="screen">
      <h2>👋 Merhaba! İkna Oyununa Başlayalım</h2>
      <button onClick={() => { setStep(1); next(); }}>Başlat</button>
    </div>
  );
}
