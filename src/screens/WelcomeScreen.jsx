
import React from "react";

const WelcomeScreen = ({ onStart }) => (
  <div style={{ padding: 20, textAlign: "center" }}>
    <h1>👋 Merhaba! İkna Oyununa Başlayalım</h1>
    <button onClick={onStart} style={{ margin: 10, padding: 10, fontSize: 16 }}>Başlat</button>
    <button onClick={() => window.close()} style={{ margin: 10, padding: 10, fontSize: 16 }}>Çıkış</button>
  </div>
);

export default WelcomeScreen;
