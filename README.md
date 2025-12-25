# Xmass-shortest-path-algorithm
An algorithm for Santa to find the fastest and shortest way to visit every child in banana island, lagos state written in Rust, Python,  and JavaScript 

## Key Features:

**🎄 Core Algorithm:**
- **Nearest Neighbor** greedy heuristic for initial route
- **2-opt optimization** (the "reindeer swap") to improve the route
- Handles Banana Island Lagos coordinates

**🦌 How it works:**
1. Starts at the North Pole (or designated start point)
2. Greedily visits the nearest unvisited child
3. Returns to start after visiting all houses
4. Optimizes with 2-opt: swaps edge pairs if it reduces total distance

**⭐ Time Complexity:**
- Nearest Neighbor: O(n²)
- 2-opt: O(n²) per iteration, typically converges quickly
- Overall: Practical for hundreds of houses in Banana Island!

**🍪 Special Notes:**
- All three implementations use Euclidean distance (can upgrade to Haversine for real GPS coords)
- Sample data uses approximate Banana Island, Lagos coordinates
- Each includes festive console output with emojis!

