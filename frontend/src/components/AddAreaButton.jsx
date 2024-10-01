
import React, { useEffect } from "react";
import L from 'leaflet';
import { useMap } from "react-leaflet";
import { useNavigate } from 'react-router-dom';
import '../styles/contactsButton.css';
import '@bopen/leaflet-area-selection/dist/index.css';
import { DrawAreaSelection } from '@bopen/leaflet-area-selection';

const AddAreaButton = () => {
    const map = useMap();
    useEffect(() => {
        const areaSelection = new DrawAreaSelection(); //FIXME: why is two???
        map.addControl(areaSelection);
    }
        , [map]);
};

export default AddAreaButton;