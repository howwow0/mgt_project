import React, { useState } from 'react';

const MetroForm = ({ metroStations, setMetroStations }) => {
  const [metro, setMetro] = useState({
    name: '',
    position: {
      type: 'Point',
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
    setMetro((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Валидация названия
    if (!metro.name.trim()) {
      newErrors.name = 'Название станции метро не может быть пустым';
      isValid = false;
    }

    // Валидация координат
    if (metro.position.coordinates.length === 0) {
      newErrors.position = 'Не выбрана точка на карте';
      isValid = false;
    }

    // Валидация утреннего трафика
    if (metro.morning_traffic <= 0) {
      newErrors.morning_traffic = 'Утренний трафик должен быть положительным числом';
      isValid = false;
    }

    // Валидация вечернего трафика
    if (metro.evening_traffic <= 0) {
      newErrors.evening_traffic = 'Вечерний трафик должен быть положительным числом';
      isValid = false;
    }

    // Валидация вместимости
    if (metro.capacity <= 0) {
      newErrors.capacity = 'Вместимость должна быть положительным числом';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  
  const removeMetroStation = (index) => {
    setMetroStations((prev) => prev.filter((_, i) => i !== index));
  };

  const addMetro = () => {
    if (validateForm()) {
      console.log(metro);
      setMetroStations([...metroStations, metro]);
      setMetro({
        name: '',
        position: { type: 'Point', coordinates: [] },
        morning_traffic: 0,
        evening_traffic: 0,
        capacity: 0,
      });
      setShowMap(false);
    } else {
      alert('Форма заполнена неверно.');
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setMetro((prev) => ({ ...prev, position: { type: 'Point', coordinates: [] } }));
    } 
    else{
      setMetro((prev) => ({
        ...prev,
        position: {
          ...prev.position,
          coordinates: [
            37.619500, 55.754000 // Липовые координаты
          ],
        },
      }));
    }
  };

  return (
    <div>
      <h3>Метро</h3>

      <label>
        Название станции:
        <input
          type="text"
          name="name"
          value={metro.name}
          onChange={handleChange}
          placeholder="Введите название станции"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Утренний трафик:
        <input
          type="number"
          name="morning_traffic"
          value={metro.morning_traffic}
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
          value={metro.evening_traffic}
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
          value={metro.capacity}
          onChange={handleChange}
          placeholder="Вместимость"
        />
        {errors.capacity && <span className="error">{errors.capacity}</span>}
      </label>

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Выбрать точку метро'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите позицию на карте:</h4>
         {/* Логика выбора точек */}
        </div>
      )}

      {errors.position && <span className="error">{errors.position}</span>}

      <button onClick={addMetro} disabled={metro.position.coordinates.length === 0 || !metro.name}>
        Добавить метро
      </button>

      <ul>
        {
        Array.isArray(metroStations) && metroStations.length > 0 ? (
          metroStations.map((station, index) => (
            <li key={index}>
              Станция метро: {station.name}, Позиция: {station.position.coordinates[1]}, {station.position.coordinates[0]}
              <button onClick={() => removeMetroStation(index)}>Удалить</button>
            </li>
          ))
        ) : (
          <li>Нет добавленных станций метро</li>
        )}
      </ul>
    </div>
  );
};

export default MetroForm;
