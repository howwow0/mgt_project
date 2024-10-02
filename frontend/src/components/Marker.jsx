import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import metroIcon from "../resources/metro.svg"
import roadIcon from "../resources/road.svg"
import constructionIcon from "../resources/home-building.svg"
const CustomMarker = ({ position, message, type }) => {
    // Используйте разные иконки для разных типов маркеров
    const icon = new L.Icon({
        iconUrl: type === 'metro-station' ? metroIcon : type === 'road' ? roadIcon : constructionIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    return (
        <Marker position={position} icon={icon}>
            <Popup>{message}</Popup>
        </Marker>
    );
};

export default CustomMarker;
