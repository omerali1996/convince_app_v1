import React, { useContext } from "react";
import { GameProvider, GameContext } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

function AppContent() {
  const { screen } = useContext(GameContext);

  if (screen === "welcome") return <WelcomeScreen />;
  if (screen === "scenario") return <ScenarioScreen />;
  if (screen === "game") return <GameScreen />;
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
