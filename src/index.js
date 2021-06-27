import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const PLAYER = {
  X: "X",
  Y: "O"
}

/* Square only has one method - render, so we
can make it a function component */
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick} // can have simpler notation like this
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: PLAYER.X,
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
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

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.nextPlayer;
    this.setState({ squares: squares, nextPlayer: this.state.nextPlayer == PLAYER.X ? PLAYER.Y : PLAYER.X});
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{`Next player: ${this.state.nextPlayer}`}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
