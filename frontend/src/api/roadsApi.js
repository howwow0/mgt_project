import axios from 'axios';

const API_URL = 'http://localhost:3000/construction-zones'; // Замените на ваш URL

export const fetchRoads = async () => {
    const response = await axios.get(API_URL);
    let raw_json =  response.data;
    console.log(raw_json);
    return raw_json['zoneRoadTraffic'];
};

// Добавьте другие функции для работы с дорогами, если нужно
