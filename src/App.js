import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Food from './Food';
import reducer, { initialState } from './reducer';
import Snake from './Snake';

export default function App() {
   
   const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const interval = setInterval(() => { moveSnake() }, state.speed);
    console.log("inside effect!");
    document.onkeydown = onkeydown;
    checkIfOutOfBorder();
    checIfCollapsed();
    checkIfEat();
    return () => clearInterval(interval);
  });
  

  onkeydown = (e) =>{
    e =e || window.event ;
      switch (e.keyCode){
        case 38:
          dispatch({
            type: "UP"
          });
          break;
          case 40:
            dispatch({
              type: "DOWN"
            });          
            break;
          case 37:
            dispatch({
              type: "LEFT"
            });
            break;
          case 39:
            dispatch({
              type: "RIGHT"
            });          
            break;
          default:
            break;
    }
  }

  const moveSnake = () => {
    let dots = [...state.snakeDots];
    console.log("current dots: " + dots);
    let head = dots[dots.length-1];
    console.log("head: " + head)
    console.log("direction: " + state.direction)
    switch (state.direction){
      case 'RIGHT':
        head=[head[0]+2,head[1]];
        console.log("right head: " + head)
        break;
      case 'LEFT':
        head=[head[0]-2,head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1]+2];
        break;
      case 'UP':
        head = [head[0], head[1] -2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    console.log("new dots:" + dots);
    dispatch( 
      {
        type: 'MOVE_SNAKE',
        dots: dots,
      }
      );
    console.log ("snakeDots after move: " + state.snakeDots);  
  }
    
  const checIfCollapsed = () => {
    let snake = [...state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        console.log("Game Over!");
        onGameOver();
      }
    });
  }
  
  const onGameOver = ()=>{
    alert(`Game Over, Snak length is: ${state.snakeDots.length}`);
    dispatch({
      type:"RESET_STATE"
    });
  } 

  const checkIfOutOfBorder = () =>{
    let head = state.snakeDots[state.snakeDots.length-1];
    if(head[0] >=100 || head[1] >= 100 || head[0]<0 || head[1] <0){
      onGameOver();
    }

    
  }
  
  const checkIfEat= () =>{
    let head = state.snakeDots[state.snakeDots.length - 1];
    let food = state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      dispatch({
        type: 'ADD_FOOD'
      });
      enlargeSnake();
      console.log("after enlargeSnake");
      increaseSpeed();
      increaseScore();
      
    }
  }
  const increaseScore = ()=>{
    dispatch({
      type:'INCREASE_SCORE'
    });
  }
  const enlargeSnake= () => {
    let newSnake = [...state.snakeDots];
    console.log("newSnake: " + newSnake);
    newSnake.unshift([]);
    console.log("newSnake: " + newSnake);
    dispatch({
      type:'ENLARGE_SNAKE',
      newSnake: newSnake,
    });
  }

  const increaseSpeed = () => {
    if (state.speed > 10) {
      dispatch({
        type:'INCREASE_SPEED'
      });
    }
  }

  return (
    <div className="app">
      <br></br>
      <h1>{state.counter}</h1>
      <div className="game__area">
        {console.log("state from app: " + JSON.stringify(state))}
        <Snake snakeDots={state.snakeDots}  />
        <Food dot={state.food}/> 
      </div>
    </div>
  );
}


