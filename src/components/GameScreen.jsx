import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function GameScreen() {
  const { currentScenario, exitGame } = useGame();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!currentScenario) return <div>Senaryo seçilmedi.</div>;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/ask", {
        user_input: userMessage,
        scenario_id: currentScenario.id,
      });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Cevap alınamadı." }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{currentScenario.name}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        <p><strong>Hikaye:</strong> {currentScenario.story}</p>
        {messages.map((m, idx) => (
          <p key={idx} style={{ textAlign: m.sender === "user" ? "right" : "left" }}>
            <strong>{m.sender === "user" ? "Sen" : currentScenario.name}:</strong> {m.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: 8 }}
        placeholder="Mesajınızı yazın..."
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: "8px 12px", marginLeft: 5 }}>
        Gönder
      </button>
      <button onClick={exitGame} style={{ padding: "8px 12px", marginLeft: 10, backgroundColor: "#f00", color: "#fff" }}>
        Çıkış
      </button>
    </div>
  );
}
