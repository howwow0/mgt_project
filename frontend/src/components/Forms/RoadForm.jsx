import React, { useState } from 'react';
import '../../styles/FormStyles.css';

const RoadForm = ({ roads, setRoads }) => {
  const [road, setRoad] = useState({
    name: '',
    geometry: {
      type: 'LineString',
      coordinates: [],
    },
    morning_traffic: "0",
    evening_traffic: "0",
    capacity: "0",
  });

  const [showMap, setShowMap] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoad((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Валидация названия дороги
    if (!road.name.trim()) {
      newErrors.name = 'Название дороги не может быть пустым';
      isValid = false;
    }

    // Валидация координат
    if (road.geometry.coordinates.length !== 2) {
      newErrors.coordinates = 'Не выбраны обе точки на карте';
      isValid = false;
    }

    // Валидация утреннего трафика
    if (road.morning_traffic <= 0) {
      newErrors.morning_traffic = 'Утренний трафик должен быть положительным числом';
      isValid = false;
    }

    // Валидация вечернего трафика
    if (road.evening_traffic <= 0) {
      newErrors.evening_traffic = 'Вечерний трафик должен быть положительным числом';
      isValid = false;
    }

    // Валидация вместимости
    if (road.capacity <= 0) {
      newErrors.capacity = 'Вместимость должна быть положительным числом';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const removeRoad = (index) => {
    setRoads((prev) => prev.filter((_, i) => i !== index));
  };
  const addRoadSegment = () => {
    if (validateForm()) {
      setRoads([...roads, road]);
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
      alert('Форма заполнена неверно.');
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setRoad((prev) => ({
        ...prev,
        geometry: { type: 'LineString', coordinates: [] }, // Сбросить позиции, если карта скрыта
      }));
    } else{
      setRoad((prev) => ({
        ...prev,
        geometry: { type: 'LineString', coordinates: [[37.623500, 55.757500], [37.624500, 55.757500]] }, //Липовые координаты
      }));
    }
  };

  return (
    <div>
      <h1>Дорога</h1>

      {/* <label>
        Название дороги:
        <input
          type="text"
          name="name"
          value={road.name}
          onChange={handleChange}
          placeholder="Введите название дороги"
        />
        {errors.name && <span className="error">{errors.name}</span>}
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
        {errors.morning_traffic && <span className="error">{errors.morning_traffic}</span>}
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
        {errors.evening_traffic && <span className="error">{errors.evening_traffic}</span>}
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
        {errors.capacity && <span className="error">{errors.capacity}</span>}
      </label>

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Выбрать две точки дороги'}
      </button> */}

      <div className='trafficForms'>
        <label>Название дороги</label>
            <input
                type="text"
                name="name"
                value={road.name}
                onChange={handleChange}
                placeholder="Введите название дороги"
                style = {{borderRadius: '2px', border: '1px solid rgba(85,69,150, 0.9)'}}
            />
        <label>Утренний трафик</label>
        <input
          type="number"
          name="morning_traffic"
          value={road.morning_traffic}
          onChange={handleChange}
          placeholder="Утренний трафик"
          style = {{borderRadius: '2px', border: '1px solid rgba(85,69,150, 0.9)'}}
        />
        <label>Вечерний трафик</label>
        <input
            type="number"
            name="evening_traffic"
            value={road.evening_traffic}
            onChange={handleChange}
            placeholder="Вечерний трафик"
          />
        <label>Пропускная способность</label>
        <input
          type="number"
          name="capacity"
          value={road.capacity}
          onChange={handleChange}
          placeholder="Пропускная способность"
        />
          <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Выбрать две точки дороги'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите начальную и конечную точки на карте:</h4>
          {/* Логика выбора точек */}
        </div>
      )}

      {errors.coordinates && <span className="error">{errors.coordinates}</span>}

      <button
        onClick={addRoadSegment}
        disabled={road.geometry.coordinates.length !== 2 || !road.name}
      >
        Добавить дорогу
      </button>
      </div>

      <ul>
        {Array.isArray(roads) && roads.length > 0 ? (
          roads.map((segment, index) => (
            <li key={index}>
              Дорога: {segment.name}, Начало: {segment.geometry.coordinates[0][1]}, {segment.geometry.coordinates[0][0]} - Конец: {segment.geometry.coordinates[1][1]}, {segment.geometry.coordinates[1][0]}
              <button onClick={() => removeRoad(index)}>Удалить</button>
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
