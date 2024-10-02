// MarkerLayer.jsx
import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import metroIcon from "../resources/metro.svg"; // Adjust path as needed
import roadIcon from "../resources/road.svg"; // Adjust path as needed
import '../styles/Zones.css';

const MarkerLayer = ({ zone, visibleLayers }) => (
  <>
    {visibleLayers.metro && zone.zoneMetroTraffic.map((metro) => (
      <Marker
        key={metro.metro_station.id}
        position={[
          metro.metro_station.position.coordinates[1],
          metro.metro_station.position.coordinates[0],
        ]}
        icon={L.icon({ iconUrl: metroIcon, iconSize: [25, 25], iconAnchor: [12, 12] })}
      >
        <Popup className="zones">
          <h3>{metro.metro_station.name}</h3>
          Утренний трафик: {metro.metro_station.morning_traffic} <br />
          Вечерний трафик: {metro.metro_station.evening_traffic} <br />
          Прогнозируемый утренний трафик: {metro.new_traffic_morning.toFixed(2)} <br />
          Прогнозируемый вечерний трафик: {metro.new_traffic_evening.toFixed(2)} <br />
          {metro.is_deficit_morning ? "Утренний трафик в дефиците" : "Утренний трафик без дефицита"}
          <br />
          {metro.is_deficit_evening ? "Вечерний трафик в дефиците" : "Вечерний трафик без дефицита"}
          <br />
        </Popup>
      </Marker>
    ))}

    {visibleLayers.roads && zone.zoneRoadTraffic.map((road) => {
      const roadCoords = road.road.geometry.coordinates.map((coord) => [coord[1], coord[0]]);
      const centerPoint = findCenter(roadCoords);

      return (
        <Marker key={road.road.id} position={centerPoint} icon={L.icon({ iconUrl: roadIcon, iconSize: [25, 25], iconAnchor: [12, 12] })}>
          <Popup className="zones">
            <h3>{road.road.name}</h3>
            Утренний трафик: {road.road.morning_traffic} <br />
            Вечерний трафик: {road.road.evening_traffic} <br />
            Прогнозируемый утренний трафик: {road.new_traffic_morning.toFixed(2)} <br />
            Прогнозируемый вечерний трафик: {road.new_traffic_evening.toFixed(2)} <br />
            {road.is_deficit_morning ? "Утренний трафик в дефиците" : "Утренний трафик без дефицита"}
            <br />
            {road.is_deficit_evening ? "Вечерний трафик в дефиците" : "Вечерний трафик без дефицита"}
            <br />
          </Popup>
        </Marker>
      );
    })}
  </>
);

const findCenter = (coords) => {
  const totalPoints = coords.length;
  const avgLat = coords.reduce((sum, coord) => sum + coord[0], 0) / totalPoints;
  const avgLng = coords.reduce((sum, coord) => sum + coord[1], 0) / totalPoints;
  return [avgLat, avgLng];
};

export default MarkerLayer;
