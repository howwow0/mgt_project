import React from 'react';

const LayerControl = ({ onLayerToggle }) => {
    return (
        <div>
            <button onClick={() => onLayerToggle('metro')}>Слой метро</button>
            <button onClick={() => onLayerToggle('roads')}>Слой дорог</button>
            <button onClick={() => onLayerToggle('construction')}>Слой строительных зон</button>
        </div>
    );
};

export default LayerControl;
