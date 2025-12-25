class Point {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
  
  distance(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Fats3stSolver {
  /**
   * Santa's Festive Assisted Travel System - Super Speedy Sleigh
   * Solves TSP using Nearest Neighbor + 2-opt optimization
   */
  constructor(houses, start) {
    this.houses = [...houses];
    this.start = start;
  }
  
  nearestNeighbor() {
    /**
     * Greedy nearest neighbor heuristic
     * Christmas magic: always visit the closest child next!
     */
    const route = [this.start];
    const unvisited = [...this.houses];
    let current = this.start;
    
    while (unvisited.length > 0) {
      // Find nearest child's house
      let nearestIdx = 0;
      let minDist = Infinity;
      
      unvisited.forEach((house, idx) => {
        const dist = current.distance(house);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = idx;
        }
      });
      
      const next = unvisited.splice(nearestIdx, 1)[0];
      route.push(next);
      current = next;
    }
    
    route.push(this.start); // Return to North Pole
    return route;
  }
  
  routeDistance(route) {
    /**
     * Calculate total distance of the route
     */
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      total += route[i].distance(route[i + 1]);
    }
    return total;
  }
  
  calculate2OptDelta(route, i, j) {
    /**
     * Calculate the change in distance from a 2-opt swap
     */
    const a = route[i - 1];
    const b = route[i];
    const c = route[j];
    const d = route[j + 1];
    
    const oldDist = a.distance(b) + c.distance(d);
    const newDist = a.distance(c) + b.distance(d);
    
    return newDist - oldDist;
  }
  
  twoOpt(route) {
    /**
     * 2-opt optimization - Reindeer swap for better routes!
     * Keep swapping edges until no improvement is found
     */
    let improved = true;
    const n = route.length;
    
    while (improved) {
      improved = false;
      
      for (let i = 1; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
          const delta = this.calculate2OptDelta(route, i, j);
          
          if (delta < -0.001) { // Found improvement (Christmas miracle!)
            // Reverse the segment between i and j
            const segment = route.slice(i, j + 1).reverse();
            route.splice(i, j - i + 1, ...segment);
            improved = true;
          }
        }
      }
    }
    
    return route;
  }
  
  solve() {
    /**
     * Solve the TSP - Find Santa's fastest route!
     * Returns [route, distance]
     */
    let route = this.nearestNeighbor();
    route = this.twoOpt(route);
    const distance = this.routeDistance(route);
    return [route, distance];
  }
}

// Main execution
function main() {
  // Sample houses in Banana Island, Lagos
  const houses = [
    new Point(3.4350, 6.4450, 1),  // Child 1
    new Point(3.4360, 6.4460, 2),  // Child 2
    new Point(3.4340, 6.4440, 3),  // Child 3
    new Point(3.4370, 6.4470, 4),  // Child 4
    new Point(3.4355, 6.4455, 5),  // Child 5
    new Point(3.4365, 6.4465, 6),  // Child 6
    new Point(3.4345, 6.4445, 7),  // Child 7
    new Point(3.4358, 6.4458, 8),  // Child 8
  ];
  
  const start = new Point(3.4350, 6.4450, 0); // North Pole (Banana Island edition)
  
  const solver = new Fats3stSolver(houses, start);
  const [route, distance] = solver.solve();
  
  console.log("🎅 Fats3st Algorithm - Santa's Optimal Route 🎄");
  console.log("=".repeat(50));
  console.log("\n🗺️  Route order:");
  
  route.forEach((point, i) => {
    if (point.id === 0) {
      console.log(`${i}. 🎁 North Pole (Start/End)`);
    } else {
      console.log(`${i}. 🏠 Child ${point.id} house at (${point.x.toFixed(4)}, ${point.y.toFixed(4)})`);
    }
  });
  
  console.log(`\n🦌 Total distance: ${(distance * 111).toFixed(4)} km`); // Rough lat/lon to km
  console.log("⭐ Reindeer optimization: 2-opt applied!");
  console.log("🍪 Cookie breaks minimized!");
  console.log("✨ Ho Ho Ho! Merry Christmas! ✨\n");
}

// Run the algorithm
main();

// Export for use in other modules (Node.js/ES6)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Point, Fats3stSolver };
             }
