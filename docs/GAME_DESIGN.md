# Документация по игре

## Основные механики
<!-- 
### Экипировка
- **Earpiece** - устройство для связи
- **Helmet** - защита головы
- **Body armor** - защита тела
- **Weapon** - основное оружие
- **Tactical Rig** - тактическое снаряжение
- **Backpack** - рюкзак для хранения предметов -->

### Слоты экипировки
Слоты имеют ограничения по категориям предметов:
- **Helmet** - только предметы категории Helmets
- **Body armor** - только предметы категории Armor
- **Weapon** - только предметы категории Weapon
- **Backpack** - может содержать предметы любой категории

Правила размещения предметов:
1. Если подобранный предмет подходит по категории к пустому слоту экипировки, он автоматически помещается в этот слот
2. Если соответствующий слот экипировки занят, предмет помещается в рюкзак
3. Предметы, не имеющие специального слота экипировки, всегда помещаются в рюкзак

### Логика рейда
При нажатии на кнопку GO запускается рейд, который может привести к одному из нескольких событий (описаны ниже).
- Рейд продолжается бесконечно, пока игрок не решит его завершить
- События происходят раз в случайное время (от 1 до 5 секунд)
- В каждый момент времени может происходить только одно событие
- Во время обработки события (например, при открытом окне дропа) генерация новых событий приостанавливается до завершения взаимодействия

## Типы событий
Игровые события
   - Обнаружение предметов
    <!-- - Встречи с противниками (TBA)
    - Нахождение помещений  -->

### Обнаружение предметов
При этом событии открывается окно дропа
В окне дропа генерится от 1 до 4 слотов (в каждом слоте предмет) 

Вероятности слотов дропа
- 1 слот == 60%
- 2 слота == 20%
- 3 слота == 15%
- 4 слота = 5%

Взаимодействие с окном дропа:
- Игрок может забрать предмет и поместить его в инвентарь
- Если инвентарь полон, показывается сообщение о невозможности взять предмет
- В окне присутствует кнопка "Отказаться" для пропуска предметов
- Игрок может закрыть окно дропа в любой момент без взятия предметов
- Нет ограничения по времени на принятие решения
- Генерация новых событий возобновляется только после закрытия окна дропа

### Генерация предметов
У предметов есть следующие параметры:
- category - определяет категорию предмета (Helmets, Armor, Weapon или другие)
- name - название предмета
- weight - вероятность генерации в слоте (чем выше значение, тем чаще выпадает предмет)
- size - размер предмета в инвентаре
- rarity - редкость предмета (влияет только на визуальное отображение)
- power - зарезервировано для будущего использования

При генерации предмета в слоте система учитывает параметр weight - чем он выше, тем вероятнее выпадение предмета.

### Инвентарь 
TBA

### Система логов
Логи отображаются в хронологическом порядке (новые сверху) и содержат:
- Временную метку события
- Описание события





