import axios from 'axios';

const API_URL = 'http://localhost:3000/construction-zones'; // Замените на ваш URL

export const fetchRoads = async () => {
    const response = await axios.get(API_URL);
    const raw_json = response.data;

    // Собираем все данные о трафике дорог из каждого объекта строительной зоны
    const allRoadTraffic = raw_json.flatMap((zone) => zone.zoneRoadTraffic);

    return allRoadTraffic;
};
