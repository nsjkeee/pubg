import { lootTable } from '../../docs/lootTable.js';

// Функция для генерации предмета с учетом весов
export const generateWeightedLoot = () => {
  // Считаем общий вес всех предметов
  const totalWeight = lootTable.reduce((sum, item) => sum + item.weight, 0);
  
  // Генерируем случайное число от 0 до totalWeight
  let random = Math.random() * totalWeight;
  
  // Проходим по предметам, вычитая их вес из random, пока не найдем нужный предмет
  for (const item of lootTable) {
    random -= item.weight;
    if (random <= 0) {
      return { ...item };
    }
  }
  
  // На случай ошибок округления возвращаем последний предмет
  return { ...lootTable[lootTable.length - 1] };
}; 