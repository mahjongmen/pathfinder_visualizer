import React, {Component} from 'react';


import './Node.css'

export default class Node extends Component{
    constructor(props){
        super (props);
        this.state={};
    }
    
    render(){
        const {
            col,
            row,
            isFinish, 
            isStart,
            isWall,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        }=this.props;

        //This is a ternary operator created if the Node is finish in the pathvisualizer class onMount
        const extraClassName=isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        :'';
        return <div 
        id = {`node-${row}-${col}`}
        className={`node ${extraClassName}`}>
        </div>
    }
}

export const DEFAULT_NODE={
    row:0,
    col:0
};