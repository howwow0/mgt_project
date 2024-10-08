import React, { useState } from 'react';
import '../../styles/FormStyles.css';

const MetroForm = ({ metroStations, setMetroStations }) => {
  const [metro, setMetro] = useState({
    name: '',
    position: {
      type: 'Point',
      coordinates: [0, 0], // Initialize with default coordinates
    },
    morning_traffic: "0",
    evening_traffic: "0",
    capacity: "0",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetro((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };


  const handleCoordChange = (e) => {
    const { name, value } = e.target;
    const coordIndex = name === "latitude" ? 1 : 0; // Set index based on the input name
    const newCoordinates = [...metro.position.coordinates];
    newCoordinates[coordIndex] = parseFloat(value); // Convert to float for coordinates
    setMetro((prev) => ({
      ...prev,
      position: { ...prev.position, coordinates: newCoordinates },
    }));
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

    if (metro.position.coordinates.some(coord => isNaN(coord))) {
      newErrors.position = 'Координаты должны быть действительными числами';
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

      setMetroStations([...metroStations, metro]);
      setMetro({
        name: '',
        position: { type: 'Point', coordinates: [0, 0] }, // Reset coordinates
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
      <h1>Метро</h1>
      <div className='trafficForms'>

      <label> Название станции</label>
        <input
          type="text"
          name="name"
          value={metro.name}
          onChange={handleChange}
          placeholder="Введите название станции"
        />
        
      

      <label>Широта</label>
        <input
          type="number"
          name="latitude"
          value={metro.position.coordinates[1]}
          onChange={handleCoordChange}
          placeholder="Широта"
        />

      <label>Долгота</label>
        <input
          type="number"
          name="longitude"
          value={metro.position.coordinates[0]}
          onChange={handleCoordChange}
          placeholder="Долгота"
        />
      

      <label>Утренний трафик</label>
        <input
          type="number"
          name="morning_traffic"
          value={metro.morning_traffic}
          onChange={handleChange}
          placeholder="Утренний трафик"
          style = {{borderRadius: '2px', border: '1px solid rgba(85,69,150, 0.9)'}}
        />
        
      

      <label>
        Вечерний трафик</label>
        <input
          type="number"
          name="evening_traffic"
          value={metro.evening_traffic}
          onChange={handleChange}
          placeholder="Вечерний трафик"
        />
        
      

      <label>Пропускная способность</label>
        <input
          type="number"
          name="capacity"
          value={metro.capacity}
          onChange={handleChange}
          placeholder="Пропускная способность"
        />
        

      
    </div>

    {/* Список ошибок */}
    <div className='errors'>
          {errors.name && <span className="error">{errors.name}</span>}
          {errors.morning_traffic && <span className="error">{errors.morning_traffic}</span>}
          {errors.evening_traffic && <span className="error">{errors.evening_traffic}</span>}
          {errors.capacity && <span className="error">{errors.capacity}</span>}
        </div>

    <button onClick={addMetro} disabled={metro.position.coordinates.length === 0 || !metro.name} className='disabledButton' style={{marginTop: '10px'}}>
        Добавить метро
    </button>

    <ul>
      {Array.isArray(metroStations) && metroStations.length > 0 ? (
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
