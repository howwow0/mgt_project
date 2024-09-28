import axios from 'axios';

const API_URL = 'http://localhost:3000/metro-stations'; // Замените на ваш URL

export const fetchMetro = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Добавьте другие функции для работы с метро, если нужно
