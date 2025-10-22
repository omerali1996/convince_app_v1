import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // welcome, scenarios, game
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState(""); // kullanıcı mesajı
  const [messages, setMessages] = useState([]); // senaryo mesajları

  // Backend’den senaryoları çek
  useEffect(() => {
    let mounted = true;
    const fetchCases = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/cases");
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

  const startGame = () => setCurrentScreen("scenarios");
  const selectScenario = (index) => {
    setCurrentCaseIndex(index);
    setMessages([
      {
        sender: cases[index]?.name || "Karakter",
        text: cases[index]?.story || "Hikaye yüklenemedi"
      }
    ]);
    setCurrentScreen("game");
  };

  const sendMessage = (text) => {
    if (!text) return;
    setMessages((prev) => [...prev, { sender: "Sen", text }]);
    setUserInput("");
    // AI cevabı simülasyonu; backend entegrasyonu burada yapılabilir
    const aiReply = `(${cases[currentCaseIndex]?.name} cevabı: "${text}" üzerine)`; 
    setMessages((prev) => [...prev, { sender: cases[currentCaseIndex]?.name, text: aiReply }]);
  };

  const resetGame = () => {
    setCurrentScreen("welcome");
    setCurrentCaseIndex(0);
    setMessages([]);
    setUserInput("");
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        startGame,
        cases,
        loading,
        error,
        selectScenario,
        currentCaseIndex,
        messages,
        userInput,
        setUserInput,
        sendMessage,
        resetGame
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
