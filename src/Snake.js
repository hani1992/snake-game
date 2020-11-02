import React from 'react'
import './Snake.css'
function Snake({snakeDots}) {
    console.log("snake from component: "+snakeDots)
    
    return (
        <div className='snake'>
            {snakeDots?.map((dot,i) =>{
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`
            }
            return (
                <div className="snake__dot" key={i} style={style}></div>
            )
        })}
            
        </div>
    )
    }

export default Snake
