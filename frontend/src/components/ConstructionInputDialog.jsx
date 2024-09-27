import React, { useState } from "react"; 

const ConstructionInputDialog = ({ bounds, onConfirm, onClose }) => {
  const [type, setType] = useState("residential");
  const [area, setArea] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      type,
      area,
      bounds, // This will contain the polygon coordinates
    };

    await onConfirm(data); // Pass data to onConfirm for saving
    onClose(); // Close dialog after submitting data
  };

  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        <h2>Введите данные о застройке</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Тип застройки:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="residential">Жилая</option>
              <option value="commercial">Коммерческая</option>
            </select>
          </label>
          <br />
          <label>
            Площадь (м²):
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
          </label>
          <br />
          <button type="submit">Отправить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default ConstructionInputDialog;
