import React, { useState, useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function GameScreen() {
  const { scenario, goBack } = useContext(GameContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { from: "user", text: input }]);
    setMessages((prev) => [...prev, { from: "AI", text: "AI cevabı backend'den gelecek" }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={goBack}>Geri</button>
      <h3>{scenario?.["Senaryo Adı"]}</h3>
      <p>{scenario?.["Hikaye"]}</p>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 200, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.from === "user" ? "right" : "left" }}>
            <b>{m.from === "user" ? "Sen" : scenario?.["Senaryo Adı"]}:</b> {m.text}
          </div>
        ))}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mesajınızı yazın" />
      <button onClick={sendMessage} style={{ marginTop: 10, width: "100%" }}>Gönder</button>
    </div>
  );
}
