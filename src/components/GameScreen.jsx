import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function GameScreen() {
  const { cases, currentCaseIndex } = useGame();
  const currentScenario = cases[currentCaseIndex];
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  if (!currentScenario) return <p>Senaryo yükleniyor...</p>;

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newHistory = [...chatHistory, { sender: "Sen", text: userInput }];
    setChatHistory(newHistory);
    setUserInput("");

    try {
      const response = await api.post("/api/ask", {
        question: userInput,
        scenarioIndex: currentCaseIndex
      });

      setChatHistory((prev) => [
        ...prev,
        { sender: `${currentScenario["Senaryo Adı"]} karakteri`, text: response.data.answer }
      ]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "Sistem", text: "AI yanıtı alınamadı" }
      ]);
    }
  };

  return (
    <div className="screen">
      <h2>📖 {currentScenario["Senaryo Adı"]}</h2>

      <div className="screen-content" style={{ flexDirection: "column", gap: "12px", height: "300px", overflowY: "auto" }}>
        {chatHistory.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Mesajınızı yazın..."
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Gönder
        </button>
      </div>
    </div>
  );
}
