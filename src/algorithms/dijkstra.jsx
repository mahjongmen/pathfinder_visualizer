export function dijkstra(grid, startNode, finishNode){
    //This will keep track of the order of the nodes
    const vistedNodesInOrder=[]
    // Handles if any inputs are null etc
    if (!startNode || !finishNode || startNode===finishNode){
        return false;
    }
    //Dijstras
    // The start node is set to a distance of 0 
    startNode.distance=0;
    //Get all the nodes into an array
    const nodesToVisit=getAllNodes(grid);
    // Iterate until we do not have any nodes left or....
    while(nodesToVisit.length){
        
        // Sort the nodes, so that the closest neighbour can be popped off
        sortNodesByDistance(nodesToVisit);
        
        //Array.shift, Takes out the most [0] in an array
        const currentNode=nodesToVisit.shift();
        
        // If this node is enclosed on itself than there is no path out
        if(currentNode.distance===Infinity){
            return vistedNodesInOrder;
        }

        // If the node is a wall, we skip everything
        if(currentNode.isWall){
            continue;
        }
        // We are going to add this node as visted
        currentNode.isVisted=true;
        //Add this node to our list 
        vistedNodesInOrder.push(currentNode);

        // If the node is equal to the finished node than we can return
        if (currentNode===finishNode){
            return vistedNodesInOrder;
        }

        // Now should update the neighbours 
        updateUnvisitedNeighbors(currentNode, grid);
    }
}

// Comparators, ordering so that A is less than B, less 
// wherever sort is defined in master library (defines it has to take a function the return value is either positive, negative or 0)
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

// Need to get all of the nodes:
function getAllNodes(grid){
    const nodes =[];
    // Iterate through the rows on the grid 
    for (const row of grid){
        // Iterate through the nodes of each row
        for (const node of row){
            // Add the node into the list
            nodes.push(node);
        }
    }
    return nodes
}

// Get all  neighbour nodes
function updateUnvisitedNeighbors(node, grid){
    // Get all the neighbour nodes
    const unvistedNeighbours=updateNeighbourNodes(node,grid);
    for (const neighbour of unvistedNeighbours){
        neighbour.distance=node.distance+1;
        neighbour.previousNode=node;
    }
}

// Get all unvisted neighbour nudes
function updateNeighbourNodes(node, grid){
    const neighbours=[];
    //Get the row and col of the node passed in
    const {row,col}=node;
    //if we are in anywhere but the top row: 
    if (row >0){
        // directly above the node 
        neighbours.push(grid[row-1][col]);
    }
    // If we are anywhere but the bottom row 
    if (row <grid.length-1){
        // directly below the node  
        neighbours.push(grid[row+1][col]);
    }
    //if we are in anywhere but the left most column: 
    if (col >0){
        // directly above the node 
        neighbours.push(grid[row][col-1]);
    }
    // If we are anywhere but the right most column 
    if (col <grid[0].length-1){
        // directly below the node  
        neighbours.push(grid[row][col+1]);
    }
    // return only the nodes that have not been visted 
    return neighbours.filter(neighbours=>(!neighbours.isVisted));
}

export function shortestPath(finishNode){
    const path=[];
    let currentNode=finishNode
    while(currentNode!==null){
        //At this node to the path (prepend)
        path.unshift(currentNode);   
        //Go back a step
        currentNode=currentNode.previousNode; 
    }
    return path; 

}

