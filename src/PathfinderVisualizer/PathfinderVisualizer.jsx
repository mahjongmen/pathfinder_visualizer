import React, {Component} from 'react';
import Node from './Node/Node';

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

    render(){
        const {grid}=this.state;
        //const{grid, mouseIsPressed}=this.state;
        // On reader, nodes will be a 15 x 50 grid of []
        return(
            <div className="grid">
                {grid.map((row, rowidx) => {
                    return( 
                        <div key={rowidx}>
                        {row.map((node, nodeidx) => {
                            const{
                                isStart, 
                                isFinish,
                                col,
                                row,
                                isWall,
                                mouseIsPressed
                            }=node;
                            return (
                                <Node
                                    key = {nodeidx}
                                    col={col}
                                    row={row}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    test={'foo'}
                                    test ={'kappa'}></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
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
