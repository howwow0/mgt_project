import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Polygon, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchMetro } from "../api/metroApi";
import { fetchRoads } from "../api/roadsApi";
import { fetchConstructionZones } from "../api/constructionsApi";
import LayerControl from "./LayerControl"; // Import the LayerControl component
import metro from '../resources/metro.svg'
const metroIcon = L.icon({
  iconUrl: metro,
  iconSize: [25, 25],
  iconAnchor: [12, 24],
});

const MapComponent = () => {
  const [metro, setMetro] = useState([]);
  const [roads, setRoads] = useState([]);
  const [constructionZones, setConstructionZones] = useState([]);

  // State to manage layer visibility
  const [visibleLayers, setVisibleLayers] = useState({
    metro: true,
    roads: true,
    construction: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const metroData = await fetchMetro();
      const roadsData = await fetchRoads();
      const constructionZonesData = await fetchConstructionZones();

      setMetro(metroData);
      setRoads(roadsData);
      console.log(metroData);
      setConstructionZones(constructionZonesData);
    };

    loadData();
  }, []);

  // Handle layer toggle logic
  const handleLayerToggle = (layer) => {
    setVisibleLayers(prevState => ({
      ...prevState,
      [layer]: !prevState[layer], // Toggle the visibility of the selected layer
    }));
  };

  return (
    <div>
      <LayerControl onLayerToggle={handleLayerToggle} /> {/* Layer control with toggle handler */}
      <MapContainer
        center={[55.746996, 37.676155]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Roads layer (toggle visibility) */}
        {visibleLayers.roads && roads.map((road) => (
          <Polyline
            key={road.id}
            positions={road.road.geometry.coordinates.map(coord => [coord[1], coord[0]])}
            color="blue"
          />
        ))}

        {/* Metro layer (toggle visibility) */}
        {visibleLayers.metro && metro.map((station) => (
          <Marker
            key={station.id}
            position={[station.metro_station.position.coordinates[1], station.metro_station.position.coordinates[0]]}
            icon={metroIcon}
          />
        ))}

        {/* Construction zones layer (toggle visibility) */}
        {visibleLayers.construction && constructionZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.area.coordinates[0].map(coord => [coord[1], coord[0]])}
            color="red"
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
