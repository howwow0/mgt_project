import React, { useState, useEffect } from 'react';
import RoadForm from './RoadForm';
import MetroForm from './MetroForm';
import ZoneAreaForm from './ZoneAreaForm';
import {fetchConstructionTypes, fetchPostConstructionZones} from "../../api/api"
import '../../styles/FormStyles.css';

const MainForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    area: {
      type: "Polygon",
      coordinates: [[]],
    },
    road: [],
    zoneArea: [],
    metroStations: [],
  });

  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [activeForm, setActiveForm] = useState();
  
  const [constructionTypes, setConstructionTypes] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Убедитесь, что name соответствует ключу в formData
  };

  useEffect(() => {
    const loadConstructionTypes = async () => {
      try {
        const types = await fetchConstructionTypes();
        setConstructionTypes(types);
      } catch (error) {
        console.error("Ошибка при загрузке типов зон:", error);
      }
    };

    loadConstructionTypes();
  }, []);

  const handleFormDataChange = (key, value) => {
    if (formData.area.coordinates.length > 0) {
      setFormData(prev => ({ ...prev, [key]: value }));
      setShowMap(false);
    } else {
      alert("Пожалуйста, выберите область на карте.");
    }
  };

  const handleValidation = () => {
    const formErrors = {};
    let formIsValid = true;

    // Name validation
    if (!formData.name || !formData.name.trim().length) {
      formIsValid = false;
      formErrors.name = "Название области не может быть пустым";
    }

    // Area validation
    if (formData.area.coordinates.length === 0) {
      formIsValid = false;
      formErrors.area = "Не выбрана область на карте";
    }

    // Roads validation
    if (formData.road.length === 0) {
      formIsValid = false;
      formErrors.road = "Отстутствует хотя бы 1 дорога";
    }

    // Metro validation
    if (formData.metroStations.length === 0) {
      formIsValid = false;
      formErrors.metroStations = "Отстутствует поле метро";
    }

    // Zone Areas validation
    if (formData.zoneArea.length === 0) {
      formIsValid = false;
      formErrors.zoneArea = "Отстутствует хотя бы 1 площадь у зоны";
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const renderForm = () => {
    switch (activeForm) {
      case "road":
        return (
          <RoadForm
            roads={formData.road}
            setRoads={(road) => handleFormDataChange("road", road)}
          />
        );
      case "metro":
        return (
          <MetroForm
            metroStations={formData.metroStations}
            setMetroStations={(metroStations) =>
              handleFormDataChange("metroStations", metroStations)
            }
          />
        );
      case "zone":
        return (
          <ZoneAreaForm
            zoneAreas={formData.zoneArea}
            setZoneAreas={(zoneArea) =>
              handleFormDataChange("zoneArea", zoneArea)
            }
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
      setFormData((prev) => ({
        ...prev,
        area: { type: "Polygon", coordinates: [] },
      }));
      setActiveForm();
    } else{
      setFormData((prev) => ({
        ...prev,
        area: {
          ...prev.area,
          coordinates: [[
            [37.618423, 55.753994],
            [37.620000, 55.753994],
            [37.620000, 55.754500],
            [37.618423, 55.754500],
            [37.618423, 55.753994],
          ]],
        },
      }));
    }
  };

  const contactSubmit = async () => {
    if (handleValidation()) {
      console.log(formData);
      const response = await fetchPostConstructionZones(formData);
      if (response.ok) {
        alert("Зона добавлена.");
        setFormData({
          name: "",
          area: { type: "Polygon", coordinates: [] },
          road: [],
          zoneArea: [],
          metroStations: [],
        });
      }
    } else {
      alert("Form has errors.");
      console.log(errors);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Название:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <button onClick={toggleMap}>
        {showMap ? "Сбросить область застройки" : "Выбрать область застройки"}
      </button>

      {showMap && (
        <div style={{ overflow: "auto", maxHeight: "400px", marginTop: "10px" }}>
          <h4>Выберите область на карте:</h4>
          {/* Mock coordinate assignment */}
          {/* You can handle coordinate selection in your map logic */}
        </div>
      )}

      <div>
        <button onClick={() => setActiveForm("road")} disabled={formData.area.coordinates.length === 0}>
          Дорога
        </button>
        <button onClick={() => setActiveForm("metro")} disabled={formData.area.coordinates.length === 0}>
          Метро
        </button>
        <button onClick={() => setActiveForm("zone")} disabled={formData.area.coordinates.length === 0}>
          Площадь
        </button>
      </div>
      {renderForm()}
      <div>
        <h2>Статистика</h2>
        <p>Дорог: {formData.road.length}</p>
        <p>Станций метро: {formData.metroStations.length}</p>
        <p>Площадей: {formData.zoneArea.length}</p>
      </div>

      <button
        onClick={contactSubmit}
        disabled={
          formData.area.coordinates.length === 0 ||
          !formData.name ||
          formData.road.length === 0 ||
          formData.zoneArea.length === 0
        }
      >
        Сохранить область
      </button>
    </div>
  );
};

export default MainForm;
