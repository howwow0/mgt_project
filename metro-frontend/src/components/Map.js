import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import metro from "../resources/metro.svg";

let metroIcon = L.icon({
  iconUrl: metro,
  iconRetinaUrl: metro,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
});

const Map = () => {
  return (
    <div className="map-container">
      <MapContainer center={[55.7558, 37.6173]} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[55.7558, 37.6173]} icon={metroIcon}>
          <Popup>Current Metro Station</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
