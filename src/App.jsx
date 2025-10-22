import React from "react";
import { GameProvider, useGame } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenariosScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

function GameFlow() {
  const { screen } = useGame();

  return (
    <div style={container}>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "scenarios" && <ScenariosScreen />}
      {screen === "game" && <GameScreen />}
    </div>
  );
}

// Styles
const container = {
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #FFFDF7, #FFF3E3)",
  fontFamily: '"Inter", "Roboto", sans-serif',
};

export default function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
}
