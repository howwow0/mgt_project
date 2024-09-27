// src/repositories/constructionRepository.js
class ConstructionRepository {
  constructor() {
    this.constructionAreas = [];
  }

  addConstructionArea(area) {
    this.constructionAreas.push(area);
  }

  removeConstructionArea(area) {
    this.constructionAreas = this.constructionAreas.filter(a => a !== area);
  }

  getConstructionAreas() {
    return this.constructionAreas;
  }

  clearConstructionAreas() {
    this.constructionAreas = [];
  }
}

const constructionRepository = new ConstructionRepository();
export default constructionRepository;
