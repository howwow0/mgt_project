import React, { useState } from "react";
import ConstructionMap from "./ConstructionMap";
import ConstructionInputDialog from "./ConstructionInputDialog";
import RoadInputDialog from "./RoadInputDialog";
import MetroInputDialog from "./MetroInputDialog";
import constructionRepository from '../repositories/constructionRepository';
import roadRepository from '../repositories/roadRepository';
import metroRepository from '../repositories/metroRepository';
import "./ConstructionMapApp.css";

const ConstructionMapApp = () => {
  const [isSelectingPoint, setIsSelectingPoint] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("construction");

  const handleAddPoint = () => {
    setIsSelectingPoint(true);
  };

  const handlePointSelect = async (position) => {
    setSelectedPosition(position);
    setIsSelectingPoint(false);
    setShowDialog(true);
  };

  const handleCloseDialog = async (data) => {
    if (data) {
      switch (selectedCategory) {
        case "construction":
          constructionRepository.addConstructionArea(data);
          break;
        case "road":
          roadRepository.addRoadPoint(data.points);
          break;
        case "metro":
          metroRepository.addMetroPoint(data.position);
          break;
        default:
          break;
      }
    }
    setShowDialog(false);
    setSelectedPosition(null);
    setIsSelectingPoint(false);
  };

  const handleCancelPoint = () => {
    setIsSelectingPoint(false); // Stop selecting mode
  };

  return (
    <div className="map-container">
      <h1 className="header">Прогноз нагрузки на сети при новых застройках</h1>

      <div className="category-selection">
        <label>Выберите категорию:</label>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">--Выберите--</option>
          <option value="construction">Застройка</option>
          <option value="road">Дорога</option>
          <option value="metro">Метро</option>
        </select>
      </div>

      <ConstructionMap
        isSelectingPoint={isSelectingPoint}
        onPointSelect={handlePointSelect}
        selectedCategory={selectedCategory}
        setCancelPoint={handleCancelPoint}
      />

      <div className="button-group">
        {selectedCategory === "construction" && (
          <>
            <button onClick={handleAddPoint} disabled={isSelectingPoint}>Добавить зону</button>
            <button disabled>Редактировать зону</button>
            <button disabled>Удалить зону</button>
          </>
        )}
        {selectedCategory === "road" && (
          <>
            <button onClick={handleAddPoint} disabled={isSelectingPoint}>Добавить дорогу</button>
            <button disabled>Редактировать дорогу</button>
            <button disabled>Удалить дорогу</button>
          </>
        )}
        {selectedCategory === "metro" && (
          <>
            <button onClick={handleAddPoint} disabled={isSelectingPoint}>Добавить метро</button>
            <button disabled>Редактировать метро</button>
            <button disabled>Удалить метро</button>
          </>
        )}
      </div>

      {showDialog && selectedCategory === "construction" && (
        <ConstructionInputDialog
          bounds={selectedPosition}
          onClose={handleCloseDialog}
        />
      )}
      {showDialog && selectedCategory === "road" && (
        <RoadInputDialog
          points={selectedPosition}
          onClose={handleCloseDialog}
        />
      )}
      {showDialog && selectedCategory === "metro" && (
        <MetroInputDialog
          position={selectedPosition}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default ConstructionMapApp;
