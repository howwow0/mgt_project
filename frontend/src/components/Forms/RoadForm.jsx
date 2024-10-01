import React, { useState } from 'react';
import MapSelector from './MapSelector';

const RoadForm = ({ roads, setRoads }) => {
  const [road, setRoad] = useState({
    name: '',
    morning_traffic: 0,
    evening_traffic: 0,
    capacity: 0,
  });

  const [showMap, setShowMap] = useState(false);
  const [positions, setPositions] = useState([null, null]); // Массив для хранения начальной и конечной точек

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoad((prev) => ({ ...prev, [name]: value }));
  };

  const addRoadSegment = () => {
    if (positions[0] && positions[1]) {
      setRoads((prev) => [
        ...prev,
        { ...road, start: positions[0], end: positions[1] },
      ]);
      // Сброс состояния формы
      setRoad({
        name: '',
        morning_traffic: 0,
        evening_traffic: 0,
        capacity: 0,
      });
      setPositions([null, null]);
      setShowMap(false); // Скрыть карту после добавления
    } else {
      alert('Пожалуйста, выберите обе точки на карте.');
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setPositions([null, null]); // Сбросить позиции, если карта скрыта
    }
  };

  return (
    <div>
      <h3>Дорога</h3>
      <input
        type="text"
        name="name"
        value={road.name}
        onChange={handleChange}
        placeholder="Название дороги"
      />
      <input
        type="number"
        name="morning_traffic"
        value={road.morning_traffic}
        onChange={handleChange}
        placeholder="Утренний трафик"
      />
      <input
        type="number"
        name="evening_traffic"
        value={road.evening_traffic}
        onChange={handleChange}
        placeholder="Вечерний трафик"
      />
      <input
        type="number"
        name="capacity"
        value={road.capacity}
        onChange={handleChange}
        placeholder="Вместимость"
      />

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Добавить дорогу'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите начальную и конечную точки на карте:</h4>
          <MapSelector
            onSelect={(selected) => setPositions(selected)} // Обновление позиций в состоянии
            selectedPositions={positions}
          />
        </div>
      )}

      <button onClick={addRoadSegment} disabled={!positions[0] || !positions[1] || !road.name}>
        Добавить дорогу
      </button>

      <ul>
        {roads.length > 0 ? (
          roads.map((segment, index) => (
            <li key={index}>
              Дорога: {segment.name}, Начало: {segment.start.lat}, {segment.start.lng} - Конец: {segment.end.lat}, {segment.end.lng}
            </li>
          ))
        ) : (
          <li>Нет добавленных дорог</li>
        )}
      </ul>
    </div>
  );
};

export default RoadForm;
