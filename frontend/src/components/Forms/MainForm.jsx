import React, { useState } from 'react';
import RoadForm from './RoadForm';
import MetroForm from './MetroForm';
import ZoneAreaForm from './ZoneAreaForm';
const MainForm = () => {
    const [roads, setRoads] = useState([]);
    const [metroStations, setMetroStations] = useState([]);
    const [zoneAreas, setZoneAreas] = useState([]);
  
    return (
      <div>
        <h1>Форма</h1>
        <RoadForm roads={roads} setRoads={setRoads} />
        <MetroForm metroStations={metroStations} setMetroStations={setMetroStations} />
        <ZoneAreaForm zoneAreas={zoneAreas} setZoneAreas={setZoneAreas} />
        {/* Другие поля формы можно добавить здесь */}
      </div>
    );
  };
  
  export default MainForm;