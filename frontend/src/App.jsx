import React from 'react';
import MapComponent from './components/MapComponent';
import './styles/App.css';
// import './pages/Contacts';
const App = () => { const handlePolygonSelect = (coordinates) => {
  console.log("Выбранные координаты:", coordinates);
};
  return (
      <div className="App">
            <MapComponent/>
            {/* <Routes>
              <Route path="/contacts" element={<Contacts />} />
            </Routes> */}
            
      </div>
  );
};

export default App;
