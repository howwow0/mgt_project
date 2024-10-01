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
      <div>
        <label htmlFor="name" style={{marginRight: '10px'}}>Название</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleFormDataChange('name', e.target.value)}
          style = {{borderRadius: '2px', border: '1px solid rgba(85,69,150, 0.9)', boxShadow: '0 1px 5px rgba(0,0,0,0.4)'}}
        />
      </div>

      <button onClick={toggleMap} style={{margin: '10px 10px 0px 0px'}}>
        {showMap ? 'Скрыть карту' : 'Выбрать область застройки'}
      </button>

      {showMap && (
        <div style={{ overflow: 'auto', maxHeight: '400px', marginTop: '10px' }}>
          <p>Выберите область на карте</p>
         {/* Логика выбора области */}
        </div>
      )}

      <div className='buttons'>
        <button onClick={() => setActiveForm('road')} style={{margin: '10px 10px 10px 0px'}}>Дорога</button>
        <button onClick={() => setActiveForm('metro')} style={{margin: '10px 10px 10px 0px'}}>Метро</button>
        <button onClick={() => setActiveForm('zone')}>Площадь</button>
      </div>
      {renderForm()}
      <div>
        <h1>Статистика</h1>
        <p>Дорог  {formData.roads.length}</p>
        <p>Станций метро {formData.metroStations.length}</p>
        <p>Площадей {formData.zoneAreas.length}</p>
      </div>

      <button onClick={handleFormDataChange} disabled={formData.area.coordinates.length === 0 || !formData.name}>
        Добавить область
      </button>
    </div>
  );
};

export default MainForm;
