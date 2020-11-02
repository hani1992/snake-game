import { Component } from "react";
import "./App.css";
import Food from "./Food";
import Snake from "./Snake";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 50;
  let x = Math.floor(Math.random() * (max - min + 1) + min / 2) * 2;
  let y = Math.floor(Math.random() * (max - min + 1) + min / 2) * 2;
  console.log("x: " + x + " y: " + y);
  return [x, y];
};

const initialState = {
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  food: getRandomCoordinates(),
  direction: "RIGHT",
  speed: 200,
};

class Game extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    console.log("inside effect!");
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    console.log("inside componentDidUpdate!");
    this.checkIfOutOfBorder();
    this.checIfCollapsed();
    this.checkIfEat();
  }
  onkeydown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    console.log("dots: " + dots);
    let head = dots[dots.length - 1];
    console.log("head: " + head);
    console.log("direction: " + this.state.direction);
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        console.log("right head: " + head);
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
    console.log("gameState from moveSnake: " + JSON.stringify(this.state));
  };

  onGameOver() {
    alert(`Game Over, Snak length is: ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  checkIfOutOfBorder() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates(),
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    console.log("newSnake: " + newSnake);
    newSnake.unshift([]);
    console.log("newSnake: " + newSnake);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
    }
  }
  render() {
    return (
      <div className="app">
        <div className="game__area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    );
  }
}

export default Game;
