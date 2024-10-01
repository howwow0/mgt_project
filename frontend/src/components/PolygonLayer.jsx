// PolygonLayer.jsx
import React from "react";
import { Polygon, Marker, Tooltip, Popup } from "react-leaflet";
import L from 'leaflet';
import zoneIcon from "../resources/zone.svg"; // Adjust path as needed
import '../styles/Zones.css';

const PolygonLayer = ({ zone, visibleLayers }) => {
  const coordinates = zone.area.coordinates[0].map((coord) => [coord[1], coord[0]]);
  const centerPoint = findCenter(coordinates);

  return (
    <>
      {visibleLayers.construction && (
        <Polygon
          positions={coordinates}
          color="black"
          fillColor="#A9A9A9"
          fillOpacity={0.8}
          weight={2}
          dashArray="5, 10"
        >
          <Marker position={centerPoint} icon={L.icon({ iconUrl: zoneIcon, iconSize: [44, 44], iconAnchor: [22, 22] })}>
            <Tooltip direction="bottom" offset={[0, 10]} permanent>
              {zone.name}
            </Tooltip>
            <Popup className="zones">
              <h3>Категория застройки:</h3>
              {zone.constructionZoneArea.map((construction) => (
                <div key={construction.id}>
                  <strong>Категория:</strong> {construction.construction_type.name} <br />
                  <strong>Площадь:</strong> {construction.zone_area} м²
                </div>
              ))}
            </Popup>
          </Marker>
        </Polygon>
      )}
    </>
  );
};

const findCenter = (coords) => {
  const totalPoints = coords.length;
  const avgLat = coords.reduce((sum, coord) => sum + coord[0], 0) / totalPoints;
  const avgLng = coords.reduce((sum, coord) => sum + coord[1], 0) / totalPoints;
  return [avgLat, avgLng];
};

export default PolygonLayer;
