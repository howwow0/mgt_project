import React, { useState } from 'react';
import '../../styles/FormStyles.css';

const MetroForm = ({ metroStations, setMetroStations }) => {
  const [metro, setMetro] = useState({
    name: '',
    position: {
      type: 'Point',
      coordinates: [],
    },
    morning_traffic: 0,
    evening_traffic: 0,
    capacity: 0,
  });

  const [showMap, setShowMap] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetro((prev) => ({ ...prev, [name]: value }));
  };

  const addMetro = () => {
    if (metro.position.coordinates.length > 0) {
      setMetroStations((prev) => [...prev, metro]);
      // Сброс состояния формы
      setMetro({
        name: '',
        position: { type: 'Point', coordinates: [] }, // Сброс позиции
        morning_traffic: 0,
        evening_traffic: 0,
        capacity: 0,
      });
      setShowMap(false); // Скрыть карту после добавления
    } else {
      alert('Пожалуйста, выберите позицию на карте.');
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setMetro((prev) => ({ ...prev, position: { type: 'Point', coordinates: [] } })); // Сбросить позицию, если карта скрыта
    }
  };

  return (
    <div>
      <h1>Метро</h1>
      <div className='trafficForms'>
        <label>Название станции</label>
            <input
                type="text"
                name="name"
                value={metro.name}
                onChange={handleChange}
                placeholder="Введите название станции"
                style = {{borderRadius: '2px', border: '1px solid rgba(85,69,150, 0.9)'}}
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
        <label>Вечерний трафик</label>
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
          placeholder="Вместимость"
        />
          <button onClick={toggleMap}>
                  {showMap ? 'Скрыть карту' : 'Выбрать точку метро'}
                </button>

                {showMap && (
                  <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
                    <h4>Выберите позицию на карте:</h4>
                  {/* Логика выбора точек */}
                  </div>
                )}

                <button onClick={addMetro} disabled={metro.position.coordinates.length === 0 || !metro.name}>
                  Добавить метро
                </button>
        </div>
      

      <ul>
        {metroStations.length > 0 ? (
          metroStations.map((station, index) => (
            <li key={index}>
              Станция метро: {station.name}, Позиция: {station.position.coordinates[1]}, {station.position.coordinates[0]}
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
