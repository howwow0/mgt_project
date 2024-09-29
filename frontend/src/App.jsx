import React from 'react';
import MapComponent from './components/MapComponent';
import './styles/App.css';
import LayerControl from './components/LayerControl';

const App = () => {
  return (
    <div className="App"> 
      <MapComponent>
        <LayerControl />
      </MapComponent>
    </div>
  );
};

export default App;
