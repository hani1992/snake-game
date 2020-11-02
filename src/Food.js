import React from 'react';
import './Food.css'
function Food (props) {
    console.log("from Food: " + props.dot)
    const style={
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return (
        <div className="snake__food" style={style}>

        </div>
    )
}

export default  Food;