import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(0); // 0 = welcome
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get("/api/scenarios")
      .then(res => mounted && setScenarios(res.data))
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, []);

  return (
    <GameContext.Provider value={{
      step, setStep,
      scenarios, selectedScenario, setSelectedScenario,
      loading
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
