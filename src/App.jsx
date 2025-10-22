import React, { useEffect } from "react";
import { GameProvider, useGame } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenariosScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

function GameFlow() {
  const { screen } = useGame();

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "scenarios" && <ScenariosScreen />}
      {screen === "game" && <GameScreen />}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
}
