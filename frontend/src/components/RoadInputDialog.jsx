import React, { useState } from "react";

const RoadInputDialog = ({ points, onConfirm, onClose }) => {
  const [length, setLength] = useState(0);
  const [type, setType] = useState("primary");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type,
      length,
      points, // Now this is an array of points
    };
    onConfirm(data); // Pass data to onConfirm for saving
    onClose(); // Close dialog after submitting data
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        <h2>Введите данные о дороге</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Тип дороги:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="primary">Первичная</option>
              <option value="secondary">Вторичная</option>
            </select>
          </label>
          <br />
          <label>
            Длина (м):
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          </label>
          <br />
          <button type="submit">Отправить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default RoadInputDialog;
