// MapComponent.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchConstructionZones } from "../api/constructionsApi";
import CustomLeafletToggleControl from "./CustomLeafletToggleControl";
import PolygonLayer from "./PolygonLayer";
import MarkerLayer from "./MarkerLayer";

const MapComponent = () => {
  const [constructionZones, setConstructionZones] = useState([]);
  const [visibleLayers, setVisibleLayers] = useState({
    metro: true,
    roads: true,
    construction: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchConstructionZones();
        setConstructionZones(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prevState) => ({
      ...prevState,
      [layer]: isChecked,
    }));
  };

  if (constructionZones.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="map-with-controls" style ={{padding: '20px'}}>
      <MapContainer
        center={[55.746996, 37.676155]}
        zoom={13}
        style={{ height: "100vh", width: "100%", borderRadius: "10px"}}
      >
        <CustomLeafletToggleControl
          visibleLayers={visibleLayers}
          handleLayerToggle={handleLayerToggle}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {constructionZones.map((zone) => (
          <PolygonLayer key={zone.id} zone={zone} visibleLayers={visibleLayers} />
        ))}
        {constructionZones.map((zone) => (
          <MarkerLayer key={zone.id} zone={zone} visibleLayers={visibleLayers} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
