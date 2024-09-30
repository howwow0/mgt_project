export class Cache {
  constructor() {
    this.cache = {};
  }

  get(key) {
    const cachedEntry = this.cache[key];
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < 60000)) { // 60 seconds expiration
      return cachedEntry.data;
    }
    return null; // Return null if the cache is expired or doesn't exist
  }

  set(key, value) {
    this.cache[key] = {
      data: value,
      timestamp: Date.now(),
    };
  }

  clear(key) {
    delete this.cache[key];
  }

  clearAll() {
    this.cache = {};
  }
}

export const cache = new Cache(); // Export an instance of Cache for use in other modules
