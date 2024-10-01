import React, { useState } from 'react';
import MapSelector from './MapSelector';

const MetroForm = ({ metroStations, setMetroStations }) => {
  const [metro, setMetro] = useState({
    name: '',
    position: null,
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
    if (metro.position) {
      setMetroStations((prev) => [...prev, metro]);
      // Сброс состояния формы
      setMetro({
        name: '',
        position: null,
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
      setMetro((prev) => ({ ...prev, position: null })); // Сбросить позицию, если карта скрыта
    }
  };

  return (
    <div>
      <h3>Метро</h3>
      <input
        type="text"
        name="name"
        value={metro.name}
        onChange={handleChange}
        placeholder="Название станции"
      />
      <input
        type="number"
        name="morning_traffic"
        value={metro.morning_traffic}
        onChange={handleChange}
        placeholder="Утренний трафик"
      />
      <input
        type="number"
        name="evening_traffic"
        value={metro.evening_traffic}
        onChange={handleChange}
        placeholder="Вечерний трафик"
      />
      <input
        type="number"
        name="capacity"
        value={metro.capacity}
        onChange={handleChange}
        placeholder="Вместимость"
      />

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Добавить станцию метро'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите позицию на карте:</h4>
          <MapSelector
            onSelect={(selected) => setMetro((prev) => ({ ...prev, position: selected[0] }))} // Установить позицию станции метро
            selectedPositions={[metro.position]} // Передать текущую позицию для отображения
          />
        </div>
      )}

      <button onClick={addMetro} disabled={!metro.position || !metro.name}>
        Добавить метро
      </button>

      <ul>
        {metroStations.length > 0 ? (
          metroStations.map((station, index) => (
            <li key={index}>
              Станция метро: {station.name}, Позиция: {station.position.lat}, {station.position.lng}
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
