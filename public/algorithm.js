class ShortestPathFinder {
  constructor() {
    this.houses = [];
    this.path = [];
    this.totalDistance = 0;
  }

  calculateDistance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  nearestNeighborTSP(startIndex = 0) {
    if (this.houses.length === 0) return [];

    const visited = new Set();
    const path = [];
    let currentIndex = startIndex;
    
    visited.add(currentIndex);
    path.push(this.houses[currentIndex]);

    while (visited.size < this.houses.length) {
      let nearestIndex = -1;
      let nearestDistance = Infinity;

      for (let i = 0; i < this.houses.length; i++) {
        if (!visited.has(i)) {
          const distance = this.calculateDistance(
            this.houses[currentIndex],
            this.houses[i]
          );
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = i;
          }
        }
      }

      if (nearestIndex !== -1) {
        visited.add(nearestIndex);
        path.push(this.houses[nearestIndex]);
        currentIndex = nearestIndex;
      }
    }

    path.push(this.houses[startIndex]);
    return path;
  }

  findShortestPath() {
    if (this.houses.length < 2) {
      this.path = [...this.houses];
      this.totalDistance = 0;
      return this.path;
    }

    let bestPath = null;
    let bestDistance = Infinity;

    for (let i = 0; i < Math.min(this.houses.length, 5); i++) {
      const candidatePath = this.nearestNeighborTSP(i);
      const distance = this.calculateTotalDistance(candidatePath);
      
      if (distance < bestDistance) {
        bestDistance = distance;
        bestPath = candidatePath;
      }
    }

    this.path = bestPath || [];
    this.totalDistance = bestDistance;
    return this.path;
  }

  calculateTotalDistance(path) {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      total += this.calculateDistance(path[i], path[i + 1]);
    }
    return total;
  }

  setHouses(houses) {
    this.houses = houses;
    this.path = [];
    this.totalDistance = 0;
  }

  getPath() {
    return this.path;
  }

  getTotalDistance() {
    return Math.round(this.totalDistance);
  }
}

window.ShortestPathFinder = ShortestPathFinder;
