// CustomLeafletToggleControl.jsx
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomLeafletToggleControl = ({ visibleLayers, handleLayerToggle }) => {
  const map = useMap();

  useEffect(() => {
    const CustomControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.padding = '10px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';

        const layers = Object.keys(visibleLayers);

        layers.forEach((layer) => {
          const checkbox = L.DomUtil.create('input', '', container);
          checkbox.type = 'checkbox';
          checkbox.checked = visibleLayers[layer];
          checkbox.id = layer;

          const label = L.DomUtil.create('label', '', container);
          label.htmlFor = layer;
          label.innerHTML = ` ${layer.charAt(0).toUpperCase() + layer.slice(1)}<br/>`;

          L.DomEvent.on(checkbox, 'change', (e) => {
            handleLayerToggle(layer, e.target.checked);
          });
        });

        return container;
      },
    });

    const control = new CustomControl();
    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map, visibleLayers, handleLayerToggle]);

  return null; // This component does not render visible JSX
};

export default CustomLeafletToggleControl;
