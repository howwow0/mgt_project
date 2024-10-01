import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSelector = ({ onSelect, selectedPositions }) => {
  const [markers, setMarkers] = useState(selectedPositions);

  const handleMapClick = (e) => {
    const newPosition = { lat: e.latlng.lat, lng: e.latlng.lng };
    const updatedMarkers = [...markers];

    if (!markers[0]) {
      updatedMarkers[0] = newPosition; // Установить начальную точку
    } else if (!markers[1]) {
      updatedMarkers[1] = newPosition; // Установить конечную точку
    }

    setMarkers(updatedMarkers); // Обновить состояние только здесь
  };

  useEffect(() => {
    // Передать выбранные позиции только если обе точки выбраны
    if (markers[0] && markers[1]) {
      onSelect(markers);
    }
  }, [markers, onSelect]); // Убедитесь, что onSelect не вызывает изменений в markers

  return (
    <MapContainer center={[55.746996, 37.676155]} zoom={13} style={{ height: '300px', width: '100%' }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((position, index) => (
        position && (
          <Marker key={index} position={position}>
            <Popup>
              Точка {index + 1}: {position.lat}, {position.lng}
            </Popup>
          </Marker>
        )
      ))}
      {markers[0] && markers[1] && (
        <Polyline positions={[markers[0], markers[1]]} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapSelector;
