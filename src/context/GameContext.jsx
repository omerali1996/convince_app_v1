import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const res = await api.get("/api/scenarios");
        setScenarios(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScenarios();
  }, []);

  const sendMessage = async () => {
    if (!userInput) return;
    const scenario = scenarios[currentScenarioIndex];
    const messageEntry = { sender: "user", text: userInput };
    setChatHistory((prev) => [...prev, messageEntry]);
    setUserInput("");

    try {
      const res = await api.post("/api/ask", {
        user_input: messageEntry.text,
        scenario_id: scenario.id
      });
      setChatHistory((prev) => [...prev, { sender: "ai", text: res.data.answer }]);
    } catch (err) {
      setChatHistory((prev) => [...prev, { sender: "ai", text: "Hata oluştu." }]);
    }
  };

  const nextScenario = () => {
    setCurrentScenarioIndex((i) => (i + 1 >= scenarios.length ? 0 : i + 1));
    setChatHistory([]);
  };

  return (
    <GameContext.Provider
      value={{
        scenarios,
        currentScenarioIndex,
        userInput,
        setUserInput,
        chatHistory,
        sendMessage,
        nextScenario
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
