import React, { useState } from 'react';
const RoadForm = ({ roads, setRoads }) => {
    const [road, setRoad] = useState({
      name: '',
      geometry: {},
      morning_traffic: 0,
      evening_traffic: 0,
      capacity: 0,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRoad((prev) => ({ ...prev, [name]: value }));
    };
  
    const addRoad = () => {
      setRoads((prev) => [...prev, road]);
      setRoad({ name: '', geometry: {}, morning_traffic: 0, evening_traffic: 0, capacity: 0 });
    };
  
    const removeRoad = (index) => {
      setRoads((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <div>
        <h3>Дороги</h3>
        <input type="text" name="name" value={road.name} onChange={handleChange} placeholder="Название дороги" />
        <button onClick={addRoad}>Добавить дорогу</button>
        <ul>
          {roads.map((road, index) => (
            <li key={index}>
              {road.name} <button onClick={() => removeRoad(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RoadForm;