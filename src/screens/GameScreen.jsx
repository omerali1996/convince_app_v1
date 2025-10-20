
import React, { useState } from "react";
import { sendMessage } from "../api/chatApi";

const GameScreen = ({ scenario }) => {
  const [story, setStory] = useState(`📖 ${scenario.Hikaye}\n\nKonuşma başlıyor.`);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setInput("");
    const reply = await sendMessage(userInput, scenario["System Prompt"]);
    setStory(prev => `${prev}\n\nSen: ${userInput}\n${scenario["Senaryo Adı"]} karakteri: ${reply}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxHeight: "60vh", overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        <pre>{story}</pre>
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Mesajınızı yazın"
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />
      <button onClick={handleSend} style={{ marginTop: 10, padding: 10 }}>Gönder</button>
      <button onClick={() => window.close()} style={{ marginTop: 10, padding: 10, backgroundColor: "#f55" }}>Çıkış</button>
    </div>
  );
};

export default GameScreen;
