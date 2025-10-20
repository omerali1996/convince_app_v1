import React, { useState } from "react";
import { GameProvider } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

export default function App() {
  const [screen, setScreen] = useState("welcome");

  const renderScreen = () => {
    switch(screen) {
      case "welcome": return <WelcomeScreen setScreen={setScreen} />;
      case "scenario": return <ScenarioScreen setScreen={setScreen} />;
      case "game": return <GameScreen setScreen={setScreen} />;
      default: return <WelcomeScreen setScreen={setScreen} />;
    }
  };

  return (
    <GameProvider>
      {renderScreen()}
    </GameProvider>
  );
}
