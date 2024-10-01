import React, { useState } from 'react';
import RoadForm from './RoadForm';
import MetroForm from './MetroForm';
import ZoneAreaForm from './ZoneAreaForm';
import '../../styles/FormStyles.css';

const MainForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    area: {
      type: 'Polygon',
      coordinates: []
    },
    roads: [],
    zoneAreas: [],
    metroStations: []
  });

  const [showMap, setShowMap] = useState(false);
  const [activeForm, setActiveForm] = useState('road'); // Состояние для активной формы

  const handleFormDataChange = (key, value) => {
    if (area.coordinates.length > 0) {
      setFormData(prev => ({ ...prev, [key]: value }));
      // Сброс состояния формы
      setFormData({
        name: '',
    area: {
      type: 'Polygon',
      coordinates: []
    },
    roads: [],
    zoneAreas: [],
    metroStations: []
      });
      setShowMap(false); // Скрыть карту после добавления
    } else {
      alert('Пожалуйста, выберите область на карте.');
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'road':
        return (
          <RoadForm
            roads={formData.roads}
            setRoads={(roads) => handleFormDataChange('roads', roads)}
          />
        );
      case 'metro':
        return (
          <MetroForm
            metroStations={formData.metroStations}
            setMetroStations={(metroStations) => handleFormDataChange('metroStations', metroStations)}
          />
        );
      case 'zone':
        const constructionTypes = [
          { id: 1, name: 'Тип 1' },
          { id: 2, name: 'Тип 2' },
          { id: 3, name: 'Тип 3' },
          // Add more types as needed
        ];
        return (
          <ZoneAreaForm
            zoneAreas={formData.zoneAreas}
            setZoneAreas={(zoneAreas) => handleFormDataChange('zoneAreas', zoneAreas)}
            constructionTypes={constructionTypes}
            
          />
        );
      default:
        return null;
    }
  };

  const toggleMap = () => {
    setShowMap((prev) => !prev);
    if (showMap) {
      setFormData((prev) => ({ ...prev, area: { type: 'Polygon', coordinates: [] } })); // Сбросить позицию, если карта скрыта
    }
  };

  return (
    <div>
      <h1>Форма</h1>
      {/* Название зоны поле */}
      <div>
        <label htmlFor="name">Название:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleFormDataChange('name', e.target.value)}
        />
      </div>

      <button onClick={toggleMap}>
        {showMap ? 'Скрыть карту' : 'Выбрать область застройки'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <h4>Выберите область на карте:</h4>
         {/* Логика выбора области */}
        </div>
      )}

      <div>
        <button onClick={() => setActiveForm('road')}>Дорога</button>
        <button onClick={() => setActiveForm('metro')}>Метро</button>
        <button onClick={() => setActiveForm('zone')}>Площадь</button>
      </div>
      {renderForm()}
      <div>
        <h2>Статистика</h2>
        <p>Дорог: {formData.roads.length}</p>
        <p>Станций метро: {formData.metroStations.length}</p>
        <p>Площадей: {formData.zoneAreas.length}</p>
      </div>

      <button onClick={handleFormDataChange} disabled={formData.area.coordinates.length === 0 || !formData.name}>
        Добавить область
      </button>
    </div>
  );
};

export default MainForm;
