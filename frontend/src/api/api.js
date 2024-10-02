import axios from "axios";
import { cache } from "../utils/cache";

const API_URL_CONSTRUCTION_ZONES = "http://localhost:3000/construction-zones";
const API_URL_CONSTRUCTION_TYPES = "http://localhost:3000/construction-types";
export const fetchConstructionZones = async () => {
  const cacheKey = "constructionZones";
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(API_URL_CONSTRUCTION_ZONES);
    const data = response.data;
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching construction zones:", error);
    throw error;
  }
};
export const fetchConstructionTypes = async () => {
  const cacheKey = "constructionTypes";
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(API_URL_CONSTRUCTION_TYPES);
    const data = response.data;
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching construction types:", error);
    throw error;
  }
};

export const fetchPostConstructionZones = async (requestBody) => {
  try {
    const response = await axios.post(API_URL_CONSTRUCTION_ZONES, requestBody);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching construction zones:", error);
    throw error;
  }
};
