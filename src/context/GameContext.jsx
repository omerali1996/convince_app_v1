// src/context/GameContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // welcome, scenario, game
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcının cevapları / sorular senaryoya özel burada tutuluyor
  const [questionsData, setQuestionsData] = useState({}); 
  // { caseIndex: { answers: [], questionCount: 0 } }

  useEffect(() => {
    let mounted = true;
    const fetchCases = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/cases"); // backend endpoint
        if (!mounted) return;
        setCases(res.data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Senaryolar yüklenemedi");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    fetchCases();
    return () => {
      mounted = false;
    };
  }, []);

  const resetGame = () => {
    setCurrentScreen("welcome");
    setCurrentCaseIndex(0);
    setQuestionsData({});
  };

  const nextCase = () => {
    setCurrentCaseIndex((i) => (i + 1 >= cases.length ? 0 : i + 1));
    setCurrentScreen("scenario");
  };

  const updateCaseQuestions = (caseIndex, newData) => {
    setQuestionsData((prev) => ({
      ...prev,
      [caseIndex]: {
        ...prev[caseIndex],
        ...newData,
      },
    }));
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        cases,
        currentCaseIndex,
        setCurrentCaseIndex,
        loading,
        error,
        resetGame,
        nextCase,
        questionsData,
        updateCaseQuestions,
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
