
import React, { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";
import ScenarioScreen from "./screens/ScenarioScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedScenario, setSelectedScenario] = useState(null);

  if (screen === "welcome") return <WelcomeScreen onStart={() => setScreen("scenario")} />;
  if (screen === "scenario") return <ScenarioScreen onSelect={(s) => { setSelectedScenario(s); setScreen("game"); }} />;
  if (screen === "game") return <GameScreen scenario={selectedScenario} />;
}
