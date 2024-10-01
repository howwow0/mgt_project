import axios from 'axios';
import { cache } from '../utils/cache';

const API_URL_CONSTRUCTION_ZONES = 'http://localhost:3000/construction-zones';
const API_URL_CONSTRUCTION_TYPES = 'http://localhost:3000/construction-types';
export const fetchConstructionZones = async () => {
  const cacheKey = 'constructionZones';

  // Check if data is in cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    // Make the API call
    const response = await axios.get(API_URL); // Corrected to axios.get
    const data = response.data; // Accessing the data from the response

    // Set the fetched data in cache
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching construction zones:", error);
    throw error; // Re-throw the error after logging it
  }
};
export const fetchConstructionTypes = async () => {
  const cacheKey = 'constructionTypes';

  // Check if data is in cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  try {
    // Make the API call
    const response = await axios.get(API_URL); // Corrected to axios.get
    const data = response.data; // Accessing the data from the response

    // Set the fetched data in cache
    cache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Error fetching construction types:", error);
    throw error; // Re-throw the error after logging it
  }
};
// You can add other functions for working with construction zones if needed
