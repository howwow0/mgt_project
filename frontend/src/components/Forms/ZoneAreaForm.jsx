import React, { useState } from 'react';

const ZoneAreaForm = ({ zoneAreas, setZoneAreas, constructionTypes }) => {
  const [zoneArea, setZoneArea] = useState({
    zone_area: 0,
    construction_type_id: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZoneArea((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(''); // Clear any previous error messages
  };

  const addZoneArea = () => {
    if (zoneArea.zone_area <= 0 || zoneArea.construction_type_id <= 0) {
      setErrorMessage('Пожалуйста, заполните все поля корректно.');
      return;
    }

    if (zoneAreas.some(zone => zone.construction_type_id === zoneArea.construction_type_id)) {
      setErrorMessage('Этот тип строительства уже выбран для другой площади.');
      return;
    }

    setZoneAreas((prev) => [...prev, zoneArea]);
    setZoneArea({ zone_area: 0, construction_type_id: 0 });
    setErrorMessage(''); // Clear any previous error messages
  };

  const removeZoneArea = (index) => {
    setZoneAreas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Площади</h3>

      {/* Label and Input for Zone Area */}
      <label htmlFor="zone_area">Площадь:</label>
      <input
        id="zone_area"
        type="number"
        name="zone_area"
        value={zoneArea.zone_area}
        onChange={handleChange}
        placeholder="Введите площадь"
      />

      {/* Label and ComboBox for Construction Type */}
      <label htmlFor="construction_type_id">Тип строительства:</label>
      <select
        id="construction_type_id"
        name="construction_type_id"
        value={zoneArea.construction_type_id}
        onChange={handleChange}
      >
        <option value="0" disabled>Выберите тип строительства</option>
        {constructionTypes.map(type => (
          // Only show the type if it is not already selected
          !zoneAreas.some(zone => zone.construction_type_id === type.id) && (
            <option key={type.id} value={type.id}>{type.name}</option>
          )
        ))}
      </select>
      
      <button 
        onClick={addZoneArea} 
        disabled={zoneArea.zone_area <= 0 || zoneArea.construction_type_id <= 0 || zoneAreas.some(zone => zone.construction_type_id === zoneArea.construction_type_id)}
      >
        Добавить площадь
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <ul>
        {zoneAreas && zoneAreas.length > 0 ? (
          zoneAreas.map((zone, index) => (
            <li key={index}>
              {zone.zone_area} - {zone.construction_type_id} 
              <button onClick={() => removeZoneArea(index)}>Удалить</button>
            </li>
          ))
        ) : (
          <li>Нет добавленных площадей</li>
        )}
      </ul>
    </div>
  );
};

export default ZoneAreaForm;