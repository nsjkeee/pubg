import React, { useState, useEffect } from 'react';
import { generateWeightedLoot } from '../data/lootGenerator';

const generateSlotCount = () => {
  const random = Math.random() * 100;
  if (random <= 60) return 1;
  if (random <= 80) return 2;
  if (random <= 95) return 3;
  return 4;
};

const generateLoot = (count) => {
  return Array(count).fill(null).map(() => generateWeightedLoot());
};

export default function LootWindow({ onClose, onTakeLoot }) {
  const [lootSlots, setLootSlots] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    const slotCount = generateSlotCount();
    const generatedLoot = generateLoot(slotCount);
    setLootSlots(generatedLoot);
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleTakeItems = () => {
    const itemsToTake = lootSlots.filter(item => selectedItems.has(item.id));
    onTakeLoot(itemsToTake);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'rare': return 'border-blue-500';
      case 'epic': return 'border-purple-500';
      default: return '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-black text-xl mb-4">Найденные предметы</h2>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-2">
          {lootSlots.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                p-3 rounded cursor-pointer border-2
                ${selectedItems.has(item.id) ? 'bg-blue-100' : 'bg-gray-50'}
                ${getRarityColor(item.rarity)}
              `}
            >
              <div className="text-black font-medium">{item.name}</div>
              <div className="text-gray-600 text-sm">
                {item.category} • Размер: {item.size}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
        >
          Отказаться
        </button>
        <button
          onClick={handleTakeItems}
          disabled={selectedItems.size === 0}
          className={`
            px-4 py-2 rounded flex-1
            ${selectedItems.size === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'}
          `}
        >
          Забрать ({selectedItems.size})
        </button>
      </div>
    </div>
  );
} 