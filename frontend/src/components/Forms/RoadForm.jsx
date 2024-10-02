import React, { useState } from 'react';

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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoad((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCoordChange = (index, e) => {
    const { name, value } = e.target;
    const newCoordinates = [...road.geometry.coordinates];
    if (!newCoordinates[index]) {
      newCoordinates[index] = []; // Initialize if undefined
    }
    newCoordinates[index][name === 'lat' ? 0 : 1] = value; // Set lat/lng correctly
    setRoad((prev) => ({
      ...prev,
      geometry: { ...prev.geometry, coordinates: newCoordinates },
    }));
  };

  const addCoordinate = () => {
    if (road.geometry.coordinates.length < 2) {
      setRoad((prev) => ({
        ...prev,
        geometry: {
          ...prev.geometry,
          coordinates: [...prev.geometry.coordinates, [0, 0]], // Start with [lng, lat] = [0, 0]
        },
      }));
    } else {
      alert("Вы можете добавить только 2 координаты.");
    }
  };

  const removeCoordinate = (index) => {
    const newCoordinates = road.geometry.coordinates.filter((_, i) => i !== index);
    setRoad((prev) => ({
      ...prev,
      geometry: { ...prev.geometry, coordinates: newCoordinates },
    }));
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
      newErrors.coordinates = 'Не введены координаты дороги';
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
    road.geometry.coordinates.forEach((coord, index) => {
      const [lng, lat] = coord; // Destructure to get longitude and latitude

      // Latitude validation
      if (isNaN(lat) || lat < -90 || lat > 90) {
        isValid = false;
        newErrors[`lat${index}`] = `Широта ${index + 1} должна быть числом от -90 до 90`;
      }
      // Longitude validation
      if (isNaN(lng) || lng < -180 || lng > 180) {
        isValid = false;
        newErrors[`lng${index}`] = `Долгота ${index + 1} должна быть числом от -180 до 180`;
      }
    });

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
        morning_traffic: "0",
        evening_traffic: "0",
        capacity: "0",
      });
    } else {
      alert('Форма заполнена неверно.');
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

      <div>
        <h4>Координаты:</h4>
        {road.geometry.coordinates.map((coord, index) => (
          <div key={index}>
            <input
              type="number"
              name="lng"
              placeholder="Долгота"
              value={coord[1]}
              onChange={(e) => handleCoordChange(index, e)}
            />
            <input
              type="number"
              name="lat"
              placeholder="Широта"
              value={coord[0]}
              onChange={(e) => handleCoordChange(index, e)}
            />
            <button onClick={() => removeCoordinate(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={addCoordinate} disabled={road.geometry.coordinates.length >= 2}>Добавить координаты</button>
        {errors.coordinates && <span className="error">{errors.coordinates}</span>}
      </div>

      <button
        onClick={addRoadSegment}
        disabled={road.geometry.coordinates.length !== 2 || !road.name}
      >
        Добавить дорогу
      </button>

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
