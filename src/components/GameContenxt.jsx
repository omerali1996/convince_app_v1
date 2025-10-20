import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(null);

  return (
    <GameContext.Provider value={{
      step,
      setStep,
      scenarios,
      setScenarios,
      currentScenarioIndex,
      setCurrentScenarioIndex
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
