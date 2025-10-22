import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [screen, setScreen] = useState("welcome"); // welcome, scenarios, game
  const [scenarios, setScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startGame = () => setScreen("scenarios");

  const selectScenario = (scenario) => {
    setCurrentScenario(scenario);
    setScreen("game");
  };

  const exitGame = () => {
    setCurrentScenario(null);
    setScreen("welcome");
  };

  const fetchScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/scenarios");
      setScenarios(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Senaryolar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        screen,
        startGame,
        selectScenario,
        exitGame,
        scenarios,
        fetchScenarios,
        currentScenario,
        loading,
        error,
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
