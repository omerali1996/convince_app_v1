import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function GameScreen() {
  const { currentScenario, updateScenarioResponse } = useGame();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!currentScenario) return <div style={emptyStyle}>Senaryo seçilmedi.</div>;

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        user_input: userInput,
        scenario_id: currentScenario.id,
      });
      updateScenarioResponse(userInput, res.data.answer);
      setUserInput("");
    } catch (err) {
      console.error(err);
      alert("Mesaj gönderilirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={chatContainerStyle}>
        {currentScenario.responses?.map((r, idx) => (
          <div
            key={idx}
            style={r.from === "user" ? userMessageStyle : aiMessageStyle}
          >
            {r.text}
          </div>
        ))}
      </div>

      <div style={inputContainerStyle}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Mesajınızı yazın..."
          style={inputStyle}
          disabled={loading}
        />
        <button onClick={handleSend} style={sendButtonStyle} disabled={loading}>
          Gönder
        </button>
      </div>
    </div>
  );
}

// -------------------------
// Styles
// -------------------------
const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#FFFDF7",
  fontFamily: '"Inter", "Roboto", sans-serif',
  padding: 20,
};

const chatContainerStyle = {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "0 8px",
  marginBottom: 16,
};

const userMessageStyle = {
  alignSelf: "flex-end",
  backgroundColor: "#FFB84C",
  color: "#1E1E1E",
  padding: "10px 14px",
  borderRadius: "16px 16px 0 16px",
  maxWidth: "70%",
  wordWrap: "break-word",
};

const aiMessageStyle = {
  alignSelf: "flex-start",
  backgroundColor: "#fff",
  color: "#2B2B2B",
  padding: "10px 14px",
  borderRadius: "16px 16px 16px 0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  maxWidth: "70%",
  wordWrap: "break-word",
};

const inputContainerStyle = {
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

const sendButtonStyle = {
  padding: "10px 20px",
  fontSize: 16,
  borderRadius: 12,
  border: "none",
  backgroundColor: "#0a74da",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const emptyStyle = {
  textAlign: "center",
  fontSize: 18,
  color: "#555",
  marginTop: 40,
};
