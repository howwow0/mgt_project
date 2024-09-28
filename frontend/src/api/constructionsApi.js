import axios from 'axios';

const API_URL = 'http://localhost:3000/construction-zones'; // Замените на ваш URL

export const fetchConstructionZones = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Добавьте другие функции для работы со строительными зонами, если нужно
