import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";

import WelcomeScreen from "./components/WelcomeScreen";
import ScenarioScreen from "./components/ScenarioScreen";
import GameScreen from "./components/GameScreen";

import "./index.css";

function GameFlow() {
  const { step, setStep } = useGame();
  const totalSteps = 3; // welcome, scenario, game

  const renderScreen = () => {
    switch (step) {
      case 0: return <WelcomeScreen />;
      case 1: return <ScenarioScreen />;
      case 2: return <GameScreen />;
      default: return <WelcomeScreen />;
    }
  };

  const progressPercent = Math.round((step / (totalSteps - 1)) * 100);

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
          <div className="logo">🤝</div>
          <div>
            <div className="title">İkna Oyunu</div>
            <div className="subtitle">
              Adım {step} / {totalSteps - 1}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className="kv">İlerleme</div>
          <div style={{ width: 220 }}>
            <div className="stepper" aria-hidden>
              <div className="steps" style={{ flex: 1 }}>
                <div className="step" title={`${progressPercent}% tamamlandı`}>
                  <div className="fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" role="main" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
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
