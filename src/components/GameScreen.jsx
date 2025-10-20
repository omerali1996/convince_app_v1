import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { askQuestion } from "../api/api";

export default function GameScreen() {
  const { scenarios, currentScenarioIndex } = useGame();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const scenario = scenarios[currentScenarioIndex];

  const sendMessage = async () => {
    if (!input) return;
    setMessages([...messages, { user: input }]);
    setInput("");
    const res = await askQuestion(currentScenarioIndex, input);
    setMessages(prev => [...prev, { ai: res.data.answer }]);
  };

  return (
    <div className="screen">
      <h2>📖 {scenario?.hikaye}</h2>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i}>
            {m.user && <b>Sen:</b>} {m.user}
            {m.ai && <b>Karakter:</b>} {m.ai}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Mesajınızı yazın" />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
}
