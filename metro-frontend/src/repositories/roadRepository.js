// src/repositories/roadRepository.js
class RoadRepository {
  constructor() {
    this.roadPoints = [];
  }

  addRoadPoint(point) {
    this.roadPoints.push(point);
  }

  removeRoadPoint(point) {
    this.roadPoints = this.roadPoints.filter(p => p !== point);
  }

  getRoadPoints() {
    return this.roadPoints;
  }

  clearRoadPoints() {
    this.roadPoints = [];
  }
}

const roadRepository = new RoadRepository();
export default roadRepository;
