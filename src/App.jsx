import React from "react";
import { GameProvider, useGame } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenariosScreen from "./components/ScenariosScreen";
import GameScreen from "./components/GameScreen";
import "./index.css";

function AppContent() {
  const { currentScreen } = useGame();

  switch (currentScreen) {
    case "welcome": return <WelcomeScreen />;
    case "scenarios": return <ScenariosScreen />;
    case "game": return <GameScreen />;
    default: return <WelcomeScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
