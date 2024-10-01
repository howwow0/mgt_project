import React, { useState } from 'react';

const RoadForm = ({ roads, setRoads }) => {
  const [road, setRoad] = useState({
    name: '',
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
    morning_traffic: 0,
    evening_traffic: 0,
    capacity: 0,
  });

  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoad((prev) => ({ ...prev, [name]: value }));
  };

  const addRoadSegment = () => {
    const { coordinates } = road.geometry;
    if (coordinates.length === 2) {
      setRoads((prev) => [...prev, road]);
      // Сброс состояния формы
      setRoad({
        name: '',
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
        morning_traffic: 0,
        evening_traffic: 0,
        capacity: 0,
      });
      setShowMap(false); // Скрыть карту после добавления
    } else {
      alert('Пожалуйста, выберите обе точки на карте.');
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setRoad((prev) => ({
        ...prev,
        geometry: { type: 'LineString', coordinates: [] }, // Сбросить позиции, если карта скрыта
      }));
    }
  };

  return (
    <div>
      <h3>Дорога</h3>

      <label>
        Название дороги:
        <input
          type="text"
          name="name"
          value={road.name}
          onChange={handleChange}
          placeholder="Введите название дороги"
        />
      </label>

      <label>
        Утренний трафик:
        <input
          type="number"
          name="morning_traffic"
          value={road.morning_traffic}
          onChange={handleChange}
          placeholder="Утренний трафик"
        />
      </label>

      <label>
        Вечерний трафик:
        <input
          type="number"
          name="evening_traffic"
          value={road.evening_traffic}
          onChange={handleChange}
          placeholder="Вечерний трафик"
        />
      </label>

      <label>
        Вместимость:
        <input
          type="number"
          name="capacity"
          value={road.capacity}
          onChange={handleChange}
          placeholder="Вместимость"
        />
      </label>

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Выбрать две точки дороги'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите начальную и конечную точки на карте:</h4>
          {/* Логика выбора точек */}
        </div>
      )}

      <button
        onClick={addRoadSegment}
        disabled={road.geometry.coordinates.length !== 2 || !road.name}
      >
        Добавить дорогу
      </button>

      <ul>
        {roads.length > 0 ? (
          roads.map((segment, index) => (
            <li key={index}>
              Дорога: {segment.name}, Начало: {segment.geometry.coordinates[0][1]}, {segment.geometry.coordinates[0][0]} - Конец: {segment.geometry.coordinates[1][1]}, {segment.geometry.coordinates[1][0]}
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
