import React, { useState } from "react";
import { GameProvider } from "./context/GameContext";
import WelcomeScreen from "./components/WelcomeScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [step, setStep] = useState(0);

  const next = () => setStep(prev => prev + 1);

  return (
    <GameProvider>
      {step === 0 && <WelcomeScreen next={next} />}
      {step === 1 && <ScenarioScreen next={next} />}
      {step === 2 && <GameScreen />}
    </GameProvider>
  );
}

export default App;
