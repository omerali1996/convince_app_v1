import React, { useEffect, useState } from "react";
import { GameProvider, useGame } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenarioListScreen from "./components/ScenarioListScreen";
import GameScreen from "./components/GameScreen";

function GameFlow() {
  const { step } = useGame();

  switch (step) {
    case 0: return <WelcomeScreen />;
    case 1: return <ScenarioListScreen />;
    case 2: return <GameScreen />;
    default: return <WelcomeScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <div className="container card">
        <GameFlow />
      </div>
    </GameProvider>
  );
}
