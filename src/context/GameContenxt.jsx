import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  useEffect(() => {
    // Backend'den senaryoları al
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cases`)
      .then(res => setCases(res.data))
      .catch(err => console.error("Senaryolar alınamadı:", err));
  }, []);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <GameContext.Provider value={{
      step, setStep, nextStep, prevStep,
      cases, setCases,
      currentCaseIndex, setCurrentCaseIndex
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
