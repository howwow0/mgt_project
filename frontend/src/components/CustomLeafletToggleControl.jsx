// CustomLeafletToggleControl.jsx
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomLeafletToggleControl = ({ visibleLayers, handleLayerToggle }) => {
  const map = useMap();
  const labels = {
    metro: "Метро",
    roads: "Дороги",
    construction: "Зоны застройки"
  };
  useEffect(() => {
    const CustomControl = L.Control.extend({
      options: {
        position: 'topright',
      },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.innerHTML = '<p style = "text-align:center; margin-bottom: 0px; font-weight: bold; color: rgb(85,69,150);">Слои</p>';
        container.style.backgroundColor = 'rgb(240,240,240, 0.8)';
        container.style.padding= '0px 20px 10px 20px';
        container.style.fontSize = '14px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';
        container.style.borderRadius = '20px';
        container.style.border = '1px solid rgba(85,69,150, 0.9)';

        
        const layers = Object.keys(visibleLayers);

        layers.forEach((layer) => {
          const checkbox = L.DomUtil.create('input', '', container);
          checkbox.style = 'accent-color: rgb(85,69,150);'
          checkbox.type = 'checkbox';
          checkbox.checked = visibleLayers[layer];
          checkbox.id = layer;

          const label = L.DomUtil.create('label', '', container);
          label.htmlFor = layer;

          label.innerHTML = ` ${labels[layer]}<br/>`;

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

  return null;
};

export default CustomLeafletToggleControl;
