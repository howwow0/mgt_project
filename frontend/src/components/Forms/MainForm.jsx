import React, { useState } from 'react';
import RoadForm from './RoadForm';
import MetroForm from './MetroForm';
import ZoneAreaForm from './ZoneAreaForm';
import '../../styles/FormStyles.css';

const MainForm = () => {
  const [roads, setRoads] = useState([]);
  const [metroStations, setMetroStations] = useState([]);
  const [zoneAreas, setZoneAreas] = useState([]);
  const [activeForm, setActiveForm] = useState('road'); // Состояние для активной формы

  const renderForm = () => {
    switch (activeForm) {
      case 'road':
        return <RoadForm roads={roads} setRoads={setRoads} />;
      case 'metro':
        return <MetroForm metroStations={metroStations} setMetroStations={setMetroStations} />;
      case 'zone':
        return <ZoneAreaForm zoneAreas={zoneAreas} setZoneAreas={setZoneAreas} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Форма</h1>
      {/* Название зоны поле */}
      {/* Поле ввода области зоны */}
      <div>
        <button onClick={() => setActiveForm('road')}>Дорога</button>
        <button onClick={() => setActiveForm('metro')}>Метро</button>
        <button onClick={() => setActiveForm('zone')}>Площадь</button>
      </div>
      {renderForm()}
      <div>
        <h2>Статистика</h2>
        <p>Дорог: {roads.length}</p>
        <p>Станций метро: {metroStations.length}</p>
        <p>Площадей: {zoneAreas.length}</p>
      </div>
    </div>
  );
};

export default MainForm;
