import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import axios from "axios";

export default function GameScreen({ setScreen }) {
  const { cases, currentCaseIndex } = useGame();
  const currentCase = cases[currentCaseIndex] || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const question = input;
    setMessages(prev => [...prev, { from: "user", text: input }]);
    setInput("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ask`, {
        question,
        diseaseIndex: currentCaseIndex
      });
      setMessages(prev => [...prev, { from: "ai", text: res.data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: "ai", text: "Cevap alınamadı." }]);
    }
  };

  return (
    <div className="screen">
      <h2>{currentCase.ad}</h2>
      <p>{currentCase.hikaye}</p>
      <div style={{flex:1, overflowY:"auto"}}>
        {messages.map((m,i) => (
          <p key={i}><b>{m.from === "user" ? "Sen" : currentCase.ad}:</b> {m.text}</p>
        ))}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Mesajınızı yazın" />
      <button onClick={sendMessage}>Gönder</button>
      <button style={{background:"#ef4444"}} onClick={()=>setScreen("scenario")}>Geri</button>
    </div>
  );
}
