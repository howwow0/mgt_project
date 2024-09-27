// src/repositories/metroRepository.js
class MetroRepository {
  constructor() {
    this.metroPoints = [];
  }

  addMetroPoint(point) {
    this.metroPoints.push(point);
  }

  removeMetroPoint(point) {
    this.metroPoints = this.metroPoints.filter(p => p !== point);
  }

  getMetroPoints() {
    return this.metroPoints;
  }

  clearMetroPoints() {
    this.metroPoints = [];
  }
}

const metroRepository = new MetroRepository();
export default metroRepository;
