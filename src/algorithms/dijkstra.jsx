  
const astar = require("./astar");

function dijkstra(grid, startNode, finishNode){
    // Handles if any inputs are null etc
    if (!startNode || !finishNode || startNode===finishNode){
        return false;
    }
}