import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function WelcomeScreen() {
  const { goToScenario } = useContext(GameContext);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>👋 Merhaba! İkna Oyunu Başlayalım</h2>
      <button onClick={goToScenario} style={{ marginTop: 20, width: "80%" }}>Başlat</button>
    </div>
  );
}
