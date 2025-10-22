import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Scenario, 2: Game
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [userMessages, setUserMessages] = useState([]); // Kullanıcının mesajları
  const [aiMessages, setAiMessages] = useState([]); // AI cevapları

  // Welcome ekranından scenario ekranına geçiş
  const startGame = () => setStep(1);

  // Scenario seçildikten sonra GameScreen'e geçiş
  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    setStep(2);
    setUserMessages([]);
    setAiMessages([]);
  };

  // Kullanıcı mesajı ekle
  const addUserMessage = (message) => {
    setUserMessages((prev) => [...prev, message]);
  };

  // AI mesajı ekle
  const addAiMessage = (message) => {
    setAiMessages((prev) => [...prev, message]);
  };

  // GameScreen'den ScenarioScreen'e geri dön
  const backToScenario = () => setStep(1);

  // Oyunu baştan başlat
  const resetGame = () => {
    setStep(0);
    setSelectedScenario(null);
    setUserMessages([]);
    setAiMessages([]);
  };

  return (
    <GameContext.Provider
      value={{
        step,
        setStep,
        selectedScenario,
        startGame,
        selectScenario,
        userMessages,
        aiMessages,
        addUserMessage,
        addAiMessage,
        backToScenario,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
