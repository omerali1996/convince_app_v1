import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenariosScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome, scenarios, game
  const [currentScenario, setCurrentScenario] = useState(null);

  const startGame = () => setScreen("scenarios");
  const selectScenario = (scenario) => {
    setCurrentScenario(scenario);
    setScreen("game");
  };
  const resetGame = () => {
    setCurrentScenario(null);
    setScreen("welcome");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {screen === "welcome" && <WelcomeScreen onStart={startGame} />}
      {screen === "scenarios" && <ScenariosScreen onSelect={selectScenario} />}
      {screen === "game" && (
        <GameScreen scenario={currentScenario} onExit={resetGame} />
      )}
    </div>
  );
}

