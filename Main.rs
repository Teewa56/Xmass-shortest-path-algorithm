use std::f64;

#[derive(Debug, Clone, Copy)]
struct Point {
    x: f64,
    y: f64,
    id: usize,
}

impl Point {
    fn new(x: f64, y: f64, id: usize) -> Self {
        Point { x, y, id }
    }
    
    fn distance(&self, other: &Point) -> f64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        (dx * dx + dy * dy).sqrt()
    }
}

struct Fats3stSolver {
    houses: Vec<Point>,
    start: Point,
}

impl Fats3stSolver {
    fn new(houses: Vec<Point>, start: Point) -> Self {
        Fats3stSolver { houses, start }
    }
    
    // Nearest Neighbor heuristic
    fn nearest_neighbor(&self) -> Vec<Point> {
        let mut route = vec![self.start];
        let mut unvisited: Vec<Point> = self.houses.clone();
        let mut current = self.start;
        
        while !unvisited.is_empty() {
            let mut nearest_idx = 0;
            let mut min_dist = f64::MAX;
            
            for (i, house) in unvisited.iter().enumerate() {
                let dist = current.distance(house);
                if dist < min_dist {
                    min_dist = dist;
                    nearest_idx = i;
                }
            }
            
            let next = unvisited.remove(nearest_idx);
            route.push(next);
            current = next;
        }
        
        route.push(self.start); // Return to start
        route
    }
    
    // Calculate total route distance
    fn route_distance(&self, route: &[Point]) -> f64 {
        route.windows(2)
            .map(|w| w[0].distance(&w[1]))
            .sum()
    }
    
    // 2-opt optimization (reindeer swap)
    fn two_opt(&self, route: &mut Vec<Point>) {
        let n = route.len();
        let mut improved = true;
        
        while improved {
            improved = false;
            
            for i in 1..n-2 {
                for j in i+1..n-1 {
                    let delta = self.calculate_2opt_delta(route, i, j);
                    
                    if delta < -0.001 { // Improvement found (Christmas magic!)
                        route[i..=j].reverse();
                        improved = true;
                    }
                }
            }
        }
    }
    
    fn calculate_2opt_delta(&self, route: &[Point], i: usize, j: usize) -> f64 {
        let a = &route[i-1];
        let b = &route[i];
        let c = &route[j];
        let d = &route[j+1];
        
        let old_dist = a.distance(b) + c.distance(d);
        let new_dist = a.distance(c) + b.distance(d);
        
        new_dist - old_dist
    }
    
    // Main solving function
    fn solve(&self) -> (Vec<Point>, f64) {
        let mut route = self.nearest_neighbor();
        self.two_opt(&mut route);
        let distance = self.route_distance(&route);
        (route, distance)
    }
}

fn main() {
    // Sample houses in Banana Island, Lagos
    let houses = vec![
        Point::new(3.4350, 6.4450, 1),  // Child 1
        Point::new(3.4360, 6.4460, 2),  // Child 2
        Point::new(3.4340, 6.4440, 3),  // Child 3
        Point::new(3.4370, 6.4470, 4),  // Child 4
        Point::new(3.4355, 6.4455, 5),  // Child 5
        Point::new(3.4365, 6.4465, 6),  // Child 6
    ];
    
    let start = Point::new(3.4350, 6.4450, 0); // North Pole (Banana Island edition)
    
    let solver = Fats3stSolver::new(houses, start);
    let (route, distance) = solver.solve();
    
    
    println!("\nRoute order:");
    for (i, point) in route.iter().enumerate() {
        if point.id == 0 {
            println!("{}. North Pole (Start/End)", i);
        } else {
            println!("{}. Child {} house at ({:.4}, {:.4})", i, point.id, point.x, point.y);
        }
    }
    
    println!("\n🦌 Total distance: {:.4} km", distance * 111.0); // Rough conversion
    println!("⭐ Reindeer optimization: 2-opt applied!");
    println!("🍪 Cookie breaks minimized!\n");
                  }
