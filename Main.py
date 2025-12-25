import math
from typing import List, Tuple

class Point:
    def __init__(self, x: float, y: float, id: int):
        self.x = x
        self.y = y
        self.id = id
    
    def distance(self, other: 'Point') -> float:
        """Calculate Euclidean distance to another point"""
        dx = self.x - other.x
        dy = self.y - other.y
        return math.sqrt(dx * dx + dy * dy)
    
    def __repr__(self):
        return f"Point(id={self.id}, x={self.x:.4f}, y={self.y:.4f})"


class Fats3stSolver:
    """Santa's Festive Assisted Travel System - Super Speedy Sleigh"""
    
    def __init__(self, houses: List[Point], start: Point):
        self.houses = houses.copy()
        self.start = start
    
    def nearest_neighbor(self) -> List[Point]:
        """Greedy nearest neighbor heuristic - Christmas magic begins!"""
        route = [self.start]
        unvisited = self.houses.copy()
        current = self.start
        
        while unvisited:
            # Find nearest child's house
            nearest = min(unvisited, key=lambda h: current.distance(h))
            route.append(nearest)
            unvisited.remove(nearest)
            current = nearest
        
        route.append(self.start)  # Return to North Pole
        return route
    
    def route_distance(self, route: List[Point]) -> float:
        """Calculate total distance of route"""
        return sum(route[i].distance(route[i+1]) 
                   for i in range(len(route) - 1))
    
    def two_opt(self, route: List[Point]) -> List[Point]:
        """2-opt optimization - Reindeer swap for better routes!"""
        improved = True
        n = len(route)
        
        while improved:
            improved = False
            
            for i in range(1, n - 2):
                for j in range(i + 1, n - 1):
                    # Calculate improvement
                    delta = self._calculate_2opt_delta(route, i, j)
                    
                    if delta < -0.001:  # Found improvement (Christmas miracle!)
                        # Reverse segment
                        route[i:j+1] = reversed(route[i:j+1])
                        improved = True
        
        return route
    
    def _calculate_2opt_delta(self, route: List[Point], i: int, j: int) -> float:
        """Calculate the change in distance from a 2-opt swap"""
        a, b = route[i-1], route[i]
        c, d = route[j], route[j+1]
        
        old_dist = a.distance(b) + c.distance(d)
        new_dist = a.distance(c) + b.distance(d)
        
        return new_dist - old_dist
    
    def solve(self) -> Tuple[List[Point], float]:
        """Solve the TSP - Find Santa's fastest route!"""
        route = self.nearest_neighbor()
        route = self.two_opt(route)
        distance = self.route_distance(route)
        return route, distance


def main():
    # Sample houses in Banana Island, Lagos
    houses = [
        Point(3.4350, 6.4450, 1),  # Child 1
        Point(3.4360, 6.4460, 2),  # Child 2
        Point(3.4340, 6.4440, 3),  # Child 3
        Point(3.4370, 6.4470, 4),  # Child 4
        Point(3.4355, 6.4455, 5),  # Child 5
        Point(3.4365, 6.4465, 6),  # Child 6
        Point(3.4345, 6.4445, 7),  # Child 7
        Point(3.4358, 6.4458, 8),  # Child 8
    ]
    
    start = Point(3.4350, 6.4450, 0)  # North Pole (Banana Island edition)
    
    solver = Fats3stSolver(houses, start)
    route, distance = solver.solve()
    
    print("🎅 Fats3st Algorithm - Santa's Optimal Route 🎄")
    print("=" * 50)
    print("\n🗺️  Route order:")
    
    for i, point in enumerate(route):
        if point.id == 0:
            print(f"{i}. 🎁 North Pole (Start/End)")
        else:
            print(f"{i}. 🏠 Child {point.id} house at ({point.x:.4f}, {point.y:.4f})")
    
    print(f"\n🦌 Total distance: {distance * 111:.4f} km")  # Rough lat/lon to km
    print("⭐ Reindeer optimization: 2-opt applied!")
    print("🍪 Cookie breaks minimized!")
    print("✨ Ho Ho Ho! Merry Christmas! ✨\n")


if __name__ == "__main__":
    main()
