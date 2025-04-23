// src/HamsterBattle.jsx
import React, { useState } from "react";

export default function HamsterBattle() {
  const COLS = 10;
  const ROWS = 4;
  const initialHp = 5;

  const [playerHp, setPlayerHp] = useState(initialHp);
  const [botHp, setBotHp] = useState(initialHp);
  const [steps, setSteps] = useState(Array(COLS).fill(null));
  const [botSteps, setBotSteps] = useState(Array(COLS).fill(null));
  const [battleLog, setBattleLog] = useState([]);

  const handleCellClick = (col, row) => {
    if (playerHp <= 0 || botHp <= 0) return;
    const newSteps = [...steps];
    newSteps[col] = row;
    const botCol = COLS - 1 - col;
    const botRow = Math.floor(Math.random() * ROWS);
    const newBotSteps = [...botSteps];
    newBotSteps[botCol] = botRow;
    setSteps(newSteps);
    setBotSteps(newBotSteps);

    let newPlayerHp = playerHp;
    let newBotHp = botHp;
    let log = `Колонка ${col + 1}: вы=${row + 1}, бот=${botRow + 1}.`;
    if (row === botRow) {
      newPlayerHp -= 1;
      newBotHp -= 1;
      log += " Столкновение — оба −1 HP.";
    }
    setPlayerHp(newPlayerHp);
    setBotHp(newBotHp);
    setBattleLog((prev) => [log, ...prev]);
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h2 className="text-xl mb-4">Бой: Перемещение</h2>
      <div className="mb-2">Ваш HP: {playerHp} — HP бота: {botHp}</div>
      <div className="grid grid-cols-10 gap-1 mb-4">
        {Array.from({ length: COLS }).map((_, col) => (
          <div key={col} className="space-y-1">
            {Array.from({ length: ROWS }).map((_, row) => {
              const isP = steps[col] === row;
              const isB = botSteps[col] === row;
              return (
                <div
                  key={row}
                  onClick={() => handleCellClick(col, row)}
                  className={`
                    h-8 flex items-center justify-center border cursor-pointer hover:bg-gray-600
                    ${isP ? "bg-green-600" : ""}
                    ${isB ? "bg-red-600"   : ""}
                  `}
                >
                  {isP ? "P" : isB ? "B" : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="bg-gray-700 p-3 rounded h-40 overflow-y-auto">
        {battleLog.map((l, i) => (
          <div key={i} className="mb-1">{l}</div>
        ))}
      </div>
    </div>
  );
}
