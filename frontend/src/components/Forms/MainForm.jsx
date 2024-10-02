import React, { useState, useEffect } from 'react';
import RoadForm from './RoadForm';
import MetroForm from './MetroForm';
import ZoneAreaForm from './ZoneAreaForm';
import { fetchConstructionTypes, fetchPostConstructionZones } from "../../api/api";
import '../../styles/FormStyles.css';

const MainForm = ({ onClose }) => {
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
  const [activeForm, setActiveForm] = useState();
  const [constructionTypes, setConstructionTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    } else {
      alert("Пожалуйста, введите координаты.");
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
      formErrors.area = "Не введены координаты области";
    }

    // Roads validation
    if (formData.road.length === 0) {
      formIsValid = false;
      formErrors.road = "Отстутствует хотя бы 1 дорога";
    }

    // Zone Areas validation
    if (formData.zoneArea.length === 0) {
      formIsValid = false;
      formErrors.zoneArea = "Отстутствует хотя бы 1 площадь у зоны";
    }

    // Coordinates validation
    formData.area.coordinates[0].forEach((coord, index) => {
      const [lng, lat] = coord; // Destructure to get longitude and latitude
  
      // Latitude validation
      if (isNaN(lat) || lat < -90 || lat > 90) {
        formIsValid = false;
        formErrors[`lat${index}`] = `Широта ${index + 1} должна быть числом от -90 до 90`;
      }
      // Longitude validation
      if (isNaN(lng) || lng < -180 || lng > 180) {
        formIsValid = false;
        formErrors[`lng${index}`] = `Долгота ${index + 1} должна быть числом от -180 до 180`;
      }
    });

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

  const contactSubmit = async () => {
    if (handleValidation()) {
      const formattedCoordinates = [formData.area.coordinates[0]]; // Wrap in another array

    const dataToSubmit = {
      ...formData,
      area: {
        ...formData.area,
        coordinates: formattedCoordinates, // Use the correctly formatted coordinates
      },
    };
      const response = await fetchPostConstructionZones(formData);
      if (response.id) {
        alert("Зона ", response.name, " добавлена.");
        setFormData({
          name: "",
          area: { type: "Polygon", coordinates: [[]] },
          road: [],
          zoneArea: [],
          metroStations: [],
        });
        setActiveForm(null);
        onClose();
      }
    } else {
      alert("Form has errors.");
      console.log(errors);
    }
  };

  const handleCoordChange = (index, e) => {
    const { name, value } = e.target;
    const newCoordinates = [...formData.area.coordinates[0]]; // Copy existing coordinates

    if (!newCoordinates[index]) {
      newCoordinates[index] = [0, 0]; // Initialize if not present
    }

    const coordIndex = name === 'lat' ? 1 : 0; // Determine which coordinate to update
    newCoordinates[index][coordIndex] = parseFloat(value); // Update specific coordinate

    // Set the coordinates back to the nested array
    setFormData((prev) => ({
      ...prev,
      area: { ...prev.area, coordinates: [newCoordinates] } // Wrap in another array
    }));
  };
  const addCoordinate = () => {
    if (formData.area.coordinates[0].length < 4) {
      setFormData((prev) => {
        const newCoordinates = [...prev.area.coordinates[0], [0, 0]]; // Add new coordinate as a pair
        return {
          ...prev,
          area: {
            ...prev.area,
            coordinates: [newCoordinates] // Wrap in another array
          }
        };
      });
    } else {
      alert("Вы можете добавить не более 4 координат.");
    }
  };

  const removeCoordinate = (index) => {
    const newCoordinates = formData.area.coordinates[0].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      area: { ...prev.area, coordinates: [newCoordinates] } // Wrap in another array
    }));
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
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div>
        <h3>Введите координаты (широта, долгота):</h3>
        {formData.area.coordinates[0].map((coord, index) => (
          <div key={index}>
            <input
              type="text"
              name="lat"
              placeholder="Широта"
              value={coord[1]} // Accessing latitude
              onChange={(e) => handleCoordChange(index, e)}
            />
            {errors[`lat${index}`] && <div className="error">{errors[`lat${index}`]}</div>}
            <input
              type="text"
              name="lng"
              placeholder="Долгота"
              value={coord[0]} // Accessing longitude
              onChange={(e) => handleCoordChange(index, e)}
            />
            {errors[`lng${index}`] && <div className="error">{errors[`lng${index}`]}</div>}
            <button onClick={() => removeCoordinate(index)}>Удалить</button>
          </div>
        ))}
        <button 
          onClick={addCoordinate} 
          disabled={formData.area.coordinates[0].length >= 4}
        >
          Добавить координаты
        </button>
      </div>

      <div>
        <button onClick={() => setActiveForm("road")} disabled={formData.area.coordinates[0].length === 0}>
          Дорога
        </button>
        <button onClick={() => setActiveForm("metro")} disabled={formData.area.coordinates[0].length === 0}>
          Метро
        </button>
        <button onClick={() => setActiveForm("zone")} disabled={formData.area.coordinates[0].length === 0}>
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
          formData.area.coordinates[0].length === 0 ||
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
