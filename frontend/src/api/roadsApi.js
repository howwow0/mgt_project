import axios from 'axios';

const API_URL = 'http://localhost:3000/roads'; // Замените на ваш URL

export const fetchRoads = async () => {
    const response = await axios.get(API_URL);
   
    return response.data;
};

// Добавьте другие функции для работы с дорогами, если нужно
