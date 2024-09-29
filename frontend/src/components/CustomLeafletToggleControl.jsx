import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomLeafletToggleControl = ({ visibleLayers, handleLayerToggle }) => {
  const map = useMap();

  useEffect(() => {
    // Define a custom Leaflet control with checkboxes
    const CustomControl = L.Control.extend({
      options: {
        position: 'topright', // Position of the control on the map
      },
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.padding = '10px';
        container.style.boxShadow = '0 1px 5px rgba(0,0,0,0.4)';

        // Create checkboxes for layers
        const layers = Object.keys(visibleLayers); // Get layer keys from props

        layers.forEach((layer) => {
          const checkbox = L.DomUtil.create('input', '', container);
          checkbox.type = 'checkbox';
          checkbox.checked = visibleLayers[layer];
          checkbox.id = layer;

          // Create label for the checkbox
          const label = L.DomUtil.create('label', '', container);
          label.htmlFor = layer;
          label.innerHTML = ` ${layer.charAt(0).toUpperCase() + layer.slice(1)}<br/>`;

          // Add event listener for checkbox change
          L.DomEvent.on(checkbox, 'change', (e) => {
            handleLayerToggle(layer, e.target.checked); // Call the handler when checkbox is toggled
          });
        });

        return container;
      },
    });

    // Add the custom control to the map
    const control = new CustomControl();
    map.addControl(control);

    // Remove control on cleanup
    return () => {
      map.removeControl(control);
    };
  }, [map, visibleLayers, handleLayerToggle]); // Re-run when visibleLayers or handleLayerToggle changes

  return null; // This component does not render visible JSX
};

export default CustomLeafletToggleControl;