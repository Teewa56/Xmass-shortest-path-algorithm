# Xmass Shortest Path Algorithm

## Overview
A web-based visualization of a shortest path algorithm to help Santa find the fastest route to visit every child in Banana Island, Lagos State. The project uses a Nearest Neighbor heuristic to solve the Traveling Salesman Problem (TSP).

## Project Structure
```
├── server.js           # Node.js HTTP server (port 5000)
├── package.json        # Project configuration
├── public/
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling
│   ├── algorithm.js   # ShortestPathFinder class with TSP algorithm
│   └── app.js         # Canvas drawing and UI interactions
```

## Running the Project
- **Development**: The web server runs on port 5000
- **Command**: `node server.js`

## Features
- Generate random house locations on a map
- Find the shortest path using the Nearest Neighbor TSP algorithm
- Animated path visualization showing Santa's route
- Responsive design

## Technology
- Node.js with native HTTP module (no external dependencies)
- HTML5 Canvas for visualization
- Vanilla JavaScript for the algorithm and UI
