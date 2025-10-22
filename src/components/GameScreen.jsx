import React from "react";
import { useGame } from "../context/GameContext";

export default function GameScreen() {
  const { cases, currentCaseIndex } = useGame();
  const scenario = cases[currentCaseIndex];

  return (
    <div className="game-screen">
      <h2>{scenario?.name}</h2>
      <p>{scenario?.story}</p>
    </div>
  );
}
