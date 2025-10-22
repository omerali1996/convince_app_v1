import React from "react";
import { useGame } from "../context/GameContext";

export default function GameScreen() {
  const { messages, userInput, setUserInput, sendMessage, resetGame } = useGame();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  return (
    <div className="screen">
      <h2>Oyun Başladı</h2>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "Sen" ? "message user" : "message ai"}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Mesajınızı yazın"
        />
        <button type="submit">Gönder</button>
      </form>
      <button onClick={resetGame}>Çıkış</button>
    </div>
  );
}
