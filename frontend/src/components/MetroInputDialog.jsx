import React, { useState } from "react";

const MetroInputDialog = ({ position, onConfirm, onClose }) => {
  const [lineName, setLineName] = useState("");
  const [capacity, setCapacity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      lineName,
      capacity,
      position, // Point coordinates (latitude and longitude)
    };
    onConfirm(data); // Pass data to onConfirm for saving
    onClose(); // Close dialog after submitting data
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        <h2>Введите данные о метро</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Название линии:
            <input type="text" value={lineName} onChange={(e) => setLineName(e.target.value)} />
          </label>
          <br />
          <label>
            Пропускная способность:
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </label>
          <br />
          <button type="submit">Отправить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default MetroInputDialog;
