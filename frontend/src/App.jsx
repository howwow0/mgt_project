import React from 'react';
import MapComponent from './components/MapComponent';
import './styles/App.css';
const App = () => {
  return (
    <div className="App">
      <header>
        <a href='#'>Карта траффика</a>
        <a href='#'>Контакты</a>
      </header>
      <MapComponent/>
      <footer>
        <p>Проект для хакатона &laquo;Студент года&raquo;</p>
        <p>Тема: &laquo;Прогноз нагрузки на дороги и метро&raquo;</p>
        <p>&copy; HackStreet Boys</p>
      </footer>
    </div>
  );
};

export default App;
