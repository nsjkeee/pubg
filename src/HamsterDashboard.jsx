import React, { useState } from 'react';
import { lootTable } from './lootTable';

export default function HamsterDashboard({ onStartGame }) {
  const [inventory, setInventory] = useState({
    weapon1: null,
    weapon2: null,
    armor: null,
    meds: null
  });
  const [logs, setLogs] = useState([]);
  const [lootModal, setLootModal] = useState({ isOpen: false, items: [] });

  const addLog = (message) => {
    setLogs(prev => [message, ...prev].slice(0, 5));
  };

  const handleTakeLoot = (item) => {
    setInventory(prev => {
      const newInventory = { ...prev };
      
      if (item.category === "Оружие") {
        if (!prev.weapon1) {
          newInventory.weapon1 = item;
        } else if (!prev.weapon2) {
          newInventory.weapon2 = item;
        } else {
          newInventory.weapon1 = item; // Replace weapon1 if both slots are full
        }
      } else if (item.category === "Броня" || item.category === "Шлемы") {
        newInventory.armor = item;
      } else if (item.category === "Лечилки") {
        newInventory.meds = item;
      }
      
      addLog(`✅ Взял ${item.name}`);
      return newInventory;
    });

    setLootModal(prev => ({
      ...prev,
      items: prev.items.filter(i => i !== item)
    }));
  };

  const handleBattle = () => {
    const outcome = Math.random();
    
    if (outcome < 0.4) { // 40% шанс найти лут
      const availableItems = [...lootTable];
      const lootCount = Math.floor(Math.random() * 3) + 1; // 1-3 предмета
      const lootItems = [];
      
      for (let i = 0; i < lootCount; i++) {
        if (availableItems.length === 0) break;
        const index = Math.floor(Math.random() * availableItems.length);
        lootItems.push(availableItems[index]);
        availableItems.splice(index, 1);
      }
      
      setLootModal({ isOpen: true, items: lootItems });
      addLog(`🔎 Найден лут: ${lootItems.length} предмет(ов)`);
    } else if (outcome < 0.7) { // 30% шанс ничего не найти
      addLog('❌ Ничего не найдено');
    } else { // 30% шанс встретить врага
      addLog('⚔️ Обнаружен враг!');
      onStartGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex flex-col">
      {/* Top header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white">
        <div className="flex items-center space-x-2">
          <img src="/icons/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">CEO</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-yellow-500 px-2 py-1 rounded-md text-black">Buy Skin</button>
          <div className="flex items-center space-x-1">
            <img src="/icons/key.png" alt="Key" className="w-5 h-5" />
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Level and profit bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-300">Bronze</span>
          <span>/</span>
          <span>1/11</span>
        </div>
        <div className="flex items-center space-x-4">
          <img src="/icons/hamster.png" alt="Hamster" className="w-8 h-8 rounded-full" />
          <div className="flex items-center space-x-1">
            <img src="/icons/coin.png" alt="Coin" className="w-5 h-5" />
            <span>0</span>
          </div>
          <button><img src="/icons/settings.png" alt="Settings" className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Menu actions */}
      <div className="grid grid-cols-4 gap-4 px-4 py-4 bg-gray-900">
        {[
          { icon: '/icons/daily_reward.png', label: 'Daily Reward', timer: '11:15' },
          { icon: '/icons/daily_cipher.png', label: 'Daily Cipher', timer: '06:15' },
          { icon: '/icons/daily_combo.png', label: 'Daily Combo', timer: '23:15' },
          { icon: '/icons/mini_game.png', label: 'Mini Game', timer: '07:15' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center bg-gray-800 p-2 rounded-lg">
            <img src={item.icon} alt={item.label} className="w-10 h-10 mb-2" />
            <span className="text-xs text-white mb-1 text-center">{item.label}</span>
            <span className="text-xs text-gray-400">{item.timer}</span>
          </div>
        ))}
      </div>

      {/* Coin display */}
      <div className="flex justify-center items-center py-4">
        <span className="text-3xl text-yellow-400 font-bold">120</span>
      </div>

      {/* Central hamster */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-64 h-64 bg-gradient-to-b from-blue-600 to-indigo-900 rounded-full flex items-center justify-center shadow-inner">
          <img src="/images/hamster.png" alt="Hamster" className="w-40 h-40 object-contain" />
        </div>
      </div>

      {/* Energy and boost */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        <div className="flex items-center space-x-2">
          <img src="/icons/lightning.png" alt="Energy" className="w-5 h-5" />
          <span>1000 / 1000</span>
        </div>
        <button 
          onClick={onStartGame}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Начать игру
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-around bg-gray-900 py-3 text-gray-400">
        {['Exchange', 'Mine', 'Friends', 'Earn', 'Airdrop'].map((tab, idx) => (
          <button key={tab} className={`flex flex-col items-center ${idx === 0 ? 'text-white' : ''}`}>
            <img src={`/icons/tab_${tab.toLowerCase()}.png`} alt={tab} className="w-6 h-6 mb-1" />
            <span className="text-xs">{tab}</span>
          </button>
        ))}
      </div>

      {/* Inventory */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900">
        <div className="col-span-2 text-white text-xl mb-2">Инвентарь:</div>
        {Object.entries(inventory).map(([slot, item]) => (
          <div key={slot} className="bg-gray-800 p-3 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">
              {slot === 'weapon1' ? 'Оружие 1' :
               slot === 'weapon2' ? 'Оружие 2' :
               slot === 'armor' ? 'Броня' : 'Лечилки'}
            </div>
            {item ? (
              <div className="text-white">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-400">{item.power}</div>
              </div>
            ) : (
              <div className="text-gray-500">Пусто</div>
            )}
          </div>
        ))}
      </div>

      {/* Battle Button */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <button
          onClick={handleBattle}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl mb-8 transition-colors"
        >
          В БОЙ!
        </button>

        {/* Logs */}
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-4">
          <div className="text-white mb-2">Логи:</div>
          {logs.map((log, index) => (
            <div key={index} className="text-gray-300 mb-1">{log}</div>
          ))}
        </div>
      </div>

      {/* Loot Modal */}
      {lootModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-white text-xl mb-4">Найден лут!</h2>
            <div className="space-y-4">
              {lootModal.items.map((item, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.power}</div>
                  </div>
                  <button
                    onClick={() => handleTakeLoot(item)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Взять
                  </button>
                </div>
              ))}
            </div>
            {lootModal.items.length === 0 && (
              <button
                onClick={() => setLootModal({ isOpen: false, items: [] })}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded mt-4 transition-colors"
              >
                Закрыть
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}