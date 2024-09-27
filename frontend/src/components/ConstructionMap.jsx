import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import metroIcon from "../resources/metro.svg"
const ConstructionMap = ({ isSelectingPoint, onPointSelect, selectedCategory, setCancelPoint }) => {
  const [polygonPoints, setPolygonPoints] = useState([]); // For construction areas
  const [roadPoints, setRoadPoints] = useState([]); // For road points
  const [metroPoints, setMetroPoints] = useState([]); // For metro points

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newPoint = [e.latlng.lat, e.latlng.lng];

        if (isSelectingPoint) {
          if (selectedCategory === "road" && roadPoints.length < 4) {
            setRoadPoints((prev) => [...prev, newPoint]);
            if (roadPoints.length === 3) {
              onPointSelect([...roadPoints, newPoint]); // Send all four points
            }
          } else if (selectedCategory === "construction" && polygonPoints.length < 4) {
            setPolygonPoints((prev) => [...prev, newPoint]);
            if (polygonPoints.length === 3) {
              onPointSelect([...polygonPoints, newPoint]); // Send all four points
            }
          } else if (selectedCategory === "metro") {
            setMetroPoints((prev) => [...prev, newPoint]);
            onPointSelect(newPoint);
          }
        }
      },
    });
    return null;
  };

  const handleCancel = () => {
    if (selectedCategory === "road" && roadPoints.length > 0) {
      setRoadPoints((prev) => prev.slice(0, -1)); // Remove last point
    } else if (selectedCategory === "construction" && polygonPoints.length > 0) {
      setPolygonPoints((prev) => prev.slice(0, -1)); // Remove last point
    } else if (selectedCategory === "metro" && metroPoints.length > 0) {
      setMetroPoints((prev) => prev.slice(0, -1)); // Remove last point
    }
    setCancelPoint(); // Notify parent to reset selection
  };

  return (
    <MapContainer center={[55.751244, 37.618423]} zoom={13} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {polygonPoints.length > 0 && <Polygon positions={polygonPoints} pathOptions={{ color: "blue" }} />}
      {roadPoints.length > 0 && <Polyline positions={roadPoints} color="red" />}
      {metroPoints.map((point, index) => (
        <Marker key={index} position={point} icon={L.icon({ iconUrl: metroIcon })} />
      ))}

      <MapEvents />

      {/* Cancel Button */}
      <button onClick={handleCancel} style={{ position: 'absolute', top: '10px', right: '10px' }}>Отменить последнюю точку</button>
    </MapContainer>
  );
};

export default ConstructionMap;
