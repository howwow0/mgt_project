import React, { useEffect } from "react";
import L from 'leaflet';
import { useMap } from "react-leaflet";
import '../styles/contactsButton.css';

const ContactsButton = () =>
{
    const map = useMap();
    useEffect(() =>
    {
        const buttonControl = L.control({position: 'bottomright'});
        buttonControl.onAdd = () =>
        {
            const button = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            button.innerHTML = '<button class="contactsButton">Контакты</button>';
            button.style.border = 'none';
            button.onclick = () => {
               // useNavigate('/contacts');
            };
            return button;
        };
        buttonControl.addTo(map);
        return () => {
            buttonControl.remove();
        };
    }, [map]);
    return null;
};

export default ContactsButton;
