import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [screen, setScreen] = useState("welcome");
  const [scenario, setScenario] = useState(null);

  const goToScenario = () => setScreen("scenario");
  const startGame = (selectedScenario) => {
    setScenario(selectedScenario);
    setScreen("game");
  };
  const goBack = () => setScreen("welcome");

  return (
    <GameContext.Provider value={{ screen, scenario, goToScenario, startGame, goBack }}>
      {children}
    </GameContext.Provider>
  );
};
