// MapComponent.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchConstructionZones } from "../api/constructionsApi";
import CustomLeafletToggleControl from "./CustomLeafletToggleControl";
import PolygonLayer from "./PolygonLayer";
import MarkerLayer from "./MarkerLayer";
import "../styles/MapComponent.css";
const MapComponent = () => {
  const [constructionZones, setConstructionZones] = useState([]);
  const [visibleLayers, setVisibleLayers] = useState({
    metro: true,
    roads: true,
    construction: true,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async (attempts = 10, delay = 4000) => {
      setLoading(true); // Start loading

      for (let i = 0; i < attempts; i++) {
        try {
          const data = await fetchConstructionZones();
          setConstructionZones(data);
          setLoading(false); 
          return;
        } catch (error) {
          console.error("Attempt failed:", error);
          // Wait for the specified delay before trying again
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      setLoading(false); 
    };

    loadData();
  }, []);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prevState) => ({
      ...prevState,
      [layer]: isChecked,
    }));
  };

  if (loading) {
    return(
    <div className="as">
      <div className="container">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>);
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
          <PolygonLayer
            key={zone.id}
            zone={zone}
            visibleLayers={visibleLayers}
          />
        ))}
        {constructionZones.map((zone) => (
          <MarkerLayer
            key={zone.id}
            zone={zone}
            visibleLayers={visibleLayers}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
