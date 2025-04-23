// src/App.tsx
import React, { useState } from "react";
import HamsterBattle from "./HamsterBattle";
import HamsterDashboard from "./HamsterDashboard";

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {isGameStarted ? (
        <HamsterBattle />
      ) : (
        <HamsterDashboard onStartGame={handleStartGame} />
      )}
    </div>
  );
}
