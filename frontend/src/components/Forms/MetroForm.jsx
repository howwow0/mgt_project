import React, { useState } from 'react';
const MetroForm = ({ metroStations, setMetroStations }) => {
    const [metro, setMetro] = useState({
      name: '',
      position: {},
      morning_traffic: 0,
      evening_traffic: 0,
      capacity: 0,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMetro((prev) => ({ ...prev, [name]: value }));
    };
  
    const addMetro = () => {
      setMetroStations((prev) => [...prev, metro]);
      setMetro({ name: '', position: {}, morning_traffic: 0, evening_traffic: 0, capacity: 0 });
    };
  
    const removeMetro = (index) => {
      setMetroStations((prev) => prev.filter((_, i) => i !== index));
    };
  
    return (
      <div>
        <h3>Метро</h3>
        <input type="text" name="name" value={metro.name} onChange={handleChange} placeholder="Название станции" />
        <button onClick={addMetro}>Добавить метро</button>
        <ul>
          {metroStations.map((metro, index) => (
            <li key={index}>
              {metro.name} <button onClick={() => removeMetro(index)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default MetroForm;