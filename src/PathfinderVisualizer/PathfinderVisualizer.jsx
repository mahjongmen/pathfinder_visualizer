import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra,shortestPath} from '../algorithms/dijkstra'

import './PathfinderVisualizer.css'
const START_NODE_ROW=10;
const START_NODE_COL=15;
const FINISH_NODE_ROW=10;
const FINISH_NODE_COL=45;

export default class PathfinderVisualizer extends Component{
    constructor(props){
        super (props);
        // this means we are housing a node object in our pathfinder visualizer 
        this.state={
            grid:[],
            mouseIsPressed: false,
        };
    }

    // Invoked after a component is added into the tree
    resetBoard(grid){
        // Change all the class names 
        for (const row of grid){
            // Iterate through the nodes of each row
            for (const node of row){
                document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
            }
        }   // Set the start node and the last node

    }

    // Invoked after a component is added into the tree
    componentDidMount(){
        const grid=intializeGrid();
        this.setState({grid})
    }
    
    handleMouseDown(row,col){
        // We have to adjust the grid if the mouse is pressed and make a new grid 
        const newGrid=getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed:true});
    }

    handleMouseEnter(row,col){
        if(!this.state.mouseIsPressed) return;
        const newGrid=getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});

    }

    handleMouseUp(row,col){
        this.setState({mouseIsPressed: false});
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }

    visualizeDijkstra(){
        const{grid}= this.state;
        //Set the start nodes to send to the dijstra function 
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
        // Can only be called once we have built a chained linkedlist from start to finish node 
        const path = shortestPath(finishNode);
        this.animateDijkstra(visitedNodesInOrder,path);
    }

    render(){
        const{grid, mouseIsPressed}=this.state;
        return(
            <><button onClick={()=> this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
            </button>
            <button onClick={()=> this.resetBoard(grid)}>
            Reset the Board 
            </button>
            <div className="grid">
                {grid.map((row, rowidx) => {
                    return( 
                        
                        <div key={rowidx}>
                        {row.map((node, nodeidx) => {
                            const{isStart, isFinish, col,row, isWall,mouseIsPressed,isReset}=node;
                            return (
                                <Node
                                    key = {nodeidx}
                                    col={col}
                                    row={row}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    isReset={isReset}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                    onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                    onMouseUp={()=>this.handleMouseUp()}>
                                    </Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
        </>
        );
    }
}


    // intialize the grid 
    const intializeGrid=()=>{
        const grid=[];
        for (let row = 0; row < 20; row++ ){
            const currentRow=[];
            for (let col = 0; col <50; col++){
                currentRow.push(createNode(col,row));
            }
            grid.push(currentRow);
        }
        return grid;
    };

// => easy way to create a function call
    // Node class with propertie we need 
    const createNode=(col,row)=>{
        return{
            col,
            row, 
            isStart: row ===START_NODE_ROW && col ===START_NODE_COL,
            isFinish: row ===FINISH_NODE_ROW && col ===FINISH_NODE_COL,
            distance: Infinity,
            isVisted: false,
            isWall: false,
            isReset: true,
            previousNode: null,
        };
    };

    // Make a new grid when it is modified
    const getNewGridWithWallToggled=(grid, row, col)=>{
        const newGrid = grid.slice();
        const node=newGrid[row][col];
        const newNode={
            ...node,
            //Toggles the wall 
            isWall: !node.isWall
        };
        // Swap the node with the new one we have made 
        newGrid[row][col]=newNode;
        return newGrid;
    };
