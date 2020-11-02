import React from 'react'

export const getRandomCoordinates = () =>{
    let min =1;
    let max = 50;
    let x = Math.floor(Math.random()*(max-min+1)+min/2)*2;
    let y = Math.floor(Math.random()*(max-min+1)+min/2)*2;
    console.log('x: ' + x + " y: " + y);
    return [x,y]
  }

export const initialState = {
    snakeDots: [[0,0], [2,0]],
    food: getRandomCoordinates(),
    direction: 'RIGHT',
    speed: 200,
    counter: 0,
  }

function reducer(state, action) {
    console.log(action);
    switch (action.type){
        case 'UP':
            return {
                ...state,
                direction:"UP"
            }
        case 'DOWN':
            return{
                ...state,
                direction:"DOWN"
            }
        case 'LEFT':
            return{
                ...state,
                direction:"LEFT"
            }
        case 'RIGHT':
            return{
                ...state,
                direction:"RIGHT"
            }
        case 'MOVE_SNAKE':
            return{
                ...state,
                snakeDots:action.dots
            }
        case 'ADD_FOOD':
            return{
                ...state,
                food: getRandomCoordinates(),
            }
        case 'ENLARGE_SNAKE':
            return{
                ...state,
                snakeDots: action.newSnake
            }
        case 'INCREASE_SPEED':
            return{
                ...state,
                speed: state.speed - 10,
            }
        case 'INCREASE_SCORE':
            return{
                ...state,
                counter: state.snakeDots.length,
            }
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

export default reducer
