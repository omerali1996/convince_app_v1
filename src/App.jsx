import React from "react";
import { GameProvider, useGame } from "./context/GameContext";
import "./index.css";

function GameScreen() {
  const { scenarios, currentScenarioIndex, userInput, setUserInput, chatHistory, sendMessage, nextScenario } = useGame();
  const scenario = scenarios[currentScenarioIndex];
  if (!scenario) return <p>Senaryolar yükleniyor...</p>;

  return (
    <div className="container">
      <h2>{scenario.name}</h2>
      <div className="card">
        <p>{scenario.story}</p>
        <div className="screen-content">
          {chatHistory.map((m, idx) => (
            <p key={idx}><strong>{m.sender === "user" ? "Sen" : scenario.name}:</strong> {m.text}</p>
          ))}
        </div>
        <div className="input-row">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>Gönder</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <button className="btn btn-secondary" onClick={nextScenario}>Sonraki Senaryo →</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}
