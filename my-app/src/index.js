import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
  );
}

class Board extends React.Component {

  //add square with 9 different values
  renderSquare(i) {
    //create a function to be called when a square is clicked
    return (
    <Square
     value={this.props.squares[i]}
     onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  //create a constructor with 9 nulls
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
        squares: Array(9).fill(null),
        coords: null
      }
    ],
      stepNumber: 0,
      xIsNext: true,
      coords: null
    };
  }

  handleClick(i) {
    //i represents the square chosen
    //create a variable to store the history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    //set the board to the last element in the history
    const current = history[history.length - 1];

    //gets the current square setup for all squares
    const squares = current.squares.slice();

    const vals = givecoords(i);

    //uses calculate winner function to see if the game is won;
    //ends the game by breaking out of handleClick function
    if (calculateWinner(squares) || squares[i]) {

      return;
    }

    //determines what user is next
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //adds a move to the history
      history: history.concat([
        {
      squares: squares,
      //adds the current grid to the history
      coords: vals
      }
    ]),

    //the current stepNumber is the length of the history
    stepNumber: history.length,

    //changes xIsNext to true or false based on last move
    xIsNext: !this.state.xIsNext,
    });
    //console.log(history);
  }

  jumpTo(step) {
    this.setState({
      //changes the grid to the specified step in history
      stepNumber: step,
      //if step is even, x is next. Otherwise, o
      xIsNext: (step % 2) === 0
    });
  }


  render() {
    //create a variable for the history
    const history = this.state.history;



    //sets the current setup to the previous step
    const current = history[this.state.stepNumber];

    //create a variable to see if the game is one when rendering
    const winner = calculateWinner(current.squares);

    //const coord = current.coords;

    //map move history
    const moves = history.map((step, move) => {

      //check if move is 0 or something else
      //if 0, the first button is created.
      //otherwise, it says to go to the move number
      //step represents the grid
      //move represents what move we are on
      const coord = step.coords;
      console.log(coord);
      //console.log(step);
      //console.log(move);
      //console.log(history.)
      const desc = move ?
       'Go to move #' + move + coord:
       'Go to game start';
      return (
        //create a button to go to that move
        <li key={move}>
          <button className="buttmove" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
           squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function givecoords(k) {
  //i represents the square chosen
  var x;
  var y;
  x = (k%3) + 1;
  if (k < 3) {
    y = 1;
  } else if(k < 6) {
    y = 2;
  } else {
    y = 3;
  }
  return ": (" + x + ", "  + y + ")";
}
