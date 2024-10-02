import React, { useState } from 'react';
import '../../styles/FormStyles.css';

const ZoneAreaForm = ({ zoneAreas, setZoneAreas, constructionTypes }) => {
  const [zoneArea, setZoneArea] = useState({
    zone_area: 0,
    construction_type_id: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setZoneArea((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Сброс ошибок при изменении
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Проверка площади
    if (zoneArea.zone_area <= 0) {
      newErrors.zone_area = 'Площадь должна быть положительным числом';
      isValid = false;
    }

    // Проверка выбранного типа строительства
    if (zoneArea.construction_type_id <= 0) {
      newErrors.construction_type_id = 'Выберите тип строительства';
      isValid = false;
    } else if (zoneAreas.some(zone => zone.construction_type_id === zoneArea.construction_type_id)) {
      newErrors.construction_type_id = 'Этот тип строительства уже выбран для другой площади';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addZoneArea = () => {
    if (validateForm()) {
      setZoneAreas([...zoneAreas, zoneArea]);
      setZoneArea({ zone_area: 0, construction_type_id: 0 }); // Сброс формы
    }
  };

  const removeZoneArea = (index) => {
    setZoneAreas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Площади</h1>
      <div className='areaForms'>

      <label htmlFor="zone_area">Площадь</label>
      <input
        id="zone_area"
        type="number"
        name="zone_area"
        value={zoneArea.zone_area}
        onChange={handleChange}
        placeholder="Введите площадь"
      />
      

      <label htmlFor="construction_type_id">Тип строительства:</label>
      <select
        id="construction_type_id"
        name="construction_type_id"
        value={zoneArea.construction_type_id}
        onChange={handleChange}
      >
        <option value="0" disabled>Выберите тип строительства</option>
        {constructionTypes.map(type => (
          // Показывать только те типы, которые еще не выбраны
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>
      
      </div>

      <div className='errors'>
        {errors.zone_area && <span className="error">{errors.zone_area}</span>}
        {errors.construction_type_id && <span className="error">{errors.construction_type_id}</span>}
      </div>

      <button 
        onClick={addZoneArea} 
        disabled={zoneArea.zone_area <= 0 || zoneArea.construction_type_id <= 0}
        className='disabledButton'
        style={{marginTop: '10px'}}
      >
        Добавить площадь
      </button>
      <ul>
        {Array.isArray(zoneAreas) && zoneAreas.length > 0 ? (
          zoneAreas.map((zone, index) => (
            <li key={index}>
              Площадь: {zone.zone_area}, Тип строительства: {constructionTypes.find(type => type.id == zone.construction_type_id)?.name}
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
