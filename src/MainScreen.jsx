import React, { useState, useCallback, useEffect, useRef } from 'react';
import LootWindow from './components/LootWindow';

export default function MainScreen() {
  const [logs, setLogs] = useState([]);
  const [isLootWindowOpen, setIsLootWindowOpen] = useState(false);
  const [isGeneratingEvents, setIsGeneratingEvents] = useState(false);
  const timeoutRef = useRef(null);

  // Состояние экипировки
  const [equipment, setEquipment] = useState({
    helmet: null,
    armor: null,
    weapon: null,
    backpack: []
  });

  // Функция для добавления нового лога
  const addLog = useCallback((message) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setLogs(prevLogs => [{
      time: timeString,
      message: message
    }, ...prevLogs]);

    // Отладочный вывод в консоль
    console.log(`[${timeString}] ${message}`);
  }, []);

  // Функция для размещения предмета
  const placeItem = useCallback((item) => {
    setEquipment(prev => {
      const newEquipment = { ...prev };

      // Проверяем, можно ли положить предмет в соответствующий слот
      if (item.category === 'Helmet' && !prev.helmet) {
        newEquipment.helmet = item;
        addLog(`Экипирован ${item.name}`);
      } else if (item.category === 'Armor' && !prev.armor) {
        newEquipment.armor = item;
        addLog(`Экипирован ${item.name}`);
      } else if (item.category === 'Weapon' && !prev.weapon) {
        newEquipment.weapon = item;
        addLog(`Экипирован ${item.name}`);
      } else {
        // Если нет свободного слота или предмет для рюкзака
        newEquipment.backpack = [...prev.backpack, item];
        addLog(`${item.name} помещен в рюкзак`);
      }

      return newEquipment;
    });
  }, [addLog]);

  // Функция для генерации событий
  const generateEvent = useCallback(() => {
    console.log('Генерация события');
    setIsLootWindowOpen(true);
    addLog('Обнаружены предметы');
    setIsGeneratingEvents(false);
  }, [addLog]);

  // Эффект для управления генерацией событий
  useEffect(() => {
    if (isGeneratingEvents && !isLootWindowOpen) {
      const delay = 1000 + Math.random() * 4000;
      console.log(`Планирую следующее событие через ${Math.round(delay/1000)} секунд`);
      
      timeoutRef.current = setTimeout(() => {
        generateEvent();
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isGeneratingEvents, isLootWindowOpen, generateEvent]);

  // Эффект для отслеживания изменений состояния
  useEffect(() => {
    console.log('Состояние изменилось:', {
      isGeneratingEvents,
      isLootWindowOpen,
      logsCount: logs.length
    });
  }, [isGeneratingEvents, isLootWindowOpen, logs]);

  // Обработчик нажатия кнопки GO
  const handleGoClick = useCallback(() => {
    console.log('Кнопка GO нажата');
    addLog('Игрок начал рейд');
    setIsGeneratingEvents(true);
  }, [addLog]);

  // Обработчики окна лута
  const handleCloseLoot = useCallback(() => {
    console.log('Закрытие окна лута');
    setIsLootWindowOpen(false);
    addLog('Игрок отказался от предметов');
    setIsGeneratingEvents(true);
  }, [addLog]);

  const handleTakeLoot = useCallback((items) => {
    console.log('Взятие предметов:', items);
    items.forEach(placeItem);
    setIsLootWindowOpen(false);
    setIsGeneratingEvents(true);
  }, [placeItem]);

  const renderEquipmentSlot = (item, placeholder) => (
    <div className="bg-white p-4 aspect-square flex items-center justify-center">
      <span className={item ? 'text-green-600 font-medium' : 'text-gray-400'}>
        {item ? item.name : placeholder}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="w-[600px] bg-gray-800 text-black relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white">
          <div className="text-2xl">🏠</div>
          <div className="text-2xl">🔍</div>
        </div>

        {/* Equipment Grid */}
        <div className="p-4 bg-gray-600">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-4 aspect-square flex items-center justify-center">
                  <span>Earpiece</span>
                </div>
                {renderEquipmentSlot(equipment.helmet, 'Helmet')}
                {renderEquipmentSlot(equipment.armor, 'Body armor')}
              </div>
              {renderEquipmentSlot(equipment.weapon, 'Weapon')}
            </div>
            
            <div className="col-span-2">
              <div className="bg-white p-4 h-40 mb-2 flex items-center justify-center">
                <span>Tactical Rig</span>
              </div>
              <div className="bg-white p-4 h-40 flex flex-col items-center justify-center">
                <span>Backpack</span>
                {equipment.backpack.length > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    {equipment.backpack.length} предметов
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Log Section or Loot Window */}
        <div className="bg-white mt-2 p-4 h-64">
          {isLootWindowOpen ? (
            <LootWindow
              onClose={handleCloseLoot}
              onTakeLoot={handleTakeLoot}
            />
          ) : (
            <div className="overflow-y-auto h-full">
              {logs.map((log, index) => (
                <div key={index} className="mb-1 font-mono">
                  <span className="text-gray-600">{log.time}</span> {log.message}
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-gray-400 text-center">
                  Нажмите кнопку Go чтобы начать рейд
                </div>
              )}
            </div>
          )}
        </div>

        {/* Go Button */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-gray-800">
          <button 
            onClick={handleGoClick}
            disabled={isGeneratingEvents}
            className={`
              w-full py-3 rounded-lg text-xl
              ${isGeneratingEvents 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'}
            `}
          >
            {isGeneratingEvents ? 'Рейд в процессе...' : 'Go'}
          </button>
        </div>
      </div>
    </div>
  );
} 