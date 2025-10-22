import React, { useState, useRef, useEffect } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function GameScreen() {
  const { currentScenario, exitGame } = useGame();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  if (!currentScenario) return <div style={empty}>Senaryo seçilmedi.</div>;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div style={container}>
      <h2 style={title}>{currentScenario.name}</h2>

      <div style={chatContainer}>
        <p style={story}><strong>Hikaye:</strong> {currentScenario.story}</p>
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={m.sender === "user" ? userMessage : aiMessage}
          >
            <strong>{m.sender === "user" ? "Sen" : currentScenario.name}:</strong> {m.text}
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>

      <div style={inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Mesajınızı yazın..."
          style={inputStyle}
          disabled={loading}
        />
        <button onClick={sendMessage} style={sendButton} disabled={loading}>
          Gönder
        </button>
        <button onClick={exitGame} style={exitButton}>
          Çıkış
        </button>
      </div>
    </div>
  );
}

// Styles
const container = {
  minHeight: "100vh",
  padding: 20,
  background: "#FFFDF7",
  fontFamily: '"Inter", "Roboto", sans-serif',
  display: "flex",
  flexDirection: "column",
};

const title = {
  fontSize: 28,
  color: "#2B2B2B",
  marginBottom: 16,
};

const chatContainer = {
  flex: 1,
  overflowY: "auto",
  padding: 12,
  border: "1px solid #ccc",
  borderRadius: 12,
  background: "#fff",
  marginBottom: 16,
};

const story = {
  marginBottom: 12,
  fontSize: 16,
  color: "#555",
};

const userMessage = {
  alignSelf: "flex-end",
  backgroundColor: "#FFB84C",
  color: "#1E1E1E",
  padding: "10px 14px",
  borderRadius: "16px 16px 0 16px",
  marginBottom: 8,
  maxWidth: "70%",
  wordWrap: "break-word",
};

const aiMessage = {
  alignSelf: "flex-start",
  backgroundColor: "#fff",
  color: "#2B2B2B",
  padding: "10px 14px",
  borderRadius: "16px 16px 16px 0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  marginBottom: 8,
  maxWidth: "70%",
  wordWrap: "break-word",
};

const inputContainer = {
  display: "flex",
  gap: 8,
};

const inputStyle = {
  flex: 1,
  padding: "10px 14px",
  fontSize: 16,
  borderRadius: 12,
  border: "1px solid #ddd",
  outline: "none",
};

const sendButton = {
  padding: "10px 16px",
  fontSize: 16,
  borderRadius: 12,
  border: "none",
  backgroundColor: "#0a74da",
  color: "#fff",
  cursor: "pointer",
};

const exitButton = {
  padding: "10px 16px",
  fontSize: 16,
  borderRadius: 12,
  border: "none",
  backgroundColor: "#f44336",
  color: "#fff",
  cursor: "pointer",
};

const empty = {
  textAlign: "center",
  fontSize: 18,
  color: "#555",
  marginTop: 40,
};
