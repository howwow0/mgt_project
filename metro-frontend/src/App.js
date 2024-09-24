import React from 'react';
import Map from './components/Map';
import TrafficInfo from './components/TrafficInfo';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Load Modeling for Roads and Metro Stations</h1>
      </header>
      <main>
        <Map />
        <TrafficInfo />
      </main>
    </div>
  );
}

export default App;
