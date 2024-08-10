import { useState } from "react";

function checkWinPattern(squares) {
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i < winPattern.length; i++) {
    const [a, b, c] = winPattern[i];
    if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }

  return null;
}

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xTurn, squares, onPlay }) {
  // const [xTurn, setXTurn] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] != null || checkWinPattern(squares)) return;

    const copySquares = squares.slice();
    if (xTurn) copySquares[i] = "X";
    else copySquares[i] = "0";
    // setXTurn(!xTurn);
    // setSquares(copySquares);
    onPlay(copySquares);
  }

  const winner = checkWinPattern(squares);
  let status = "no status yet";
  if (winner) status = "Winner: " + winner + " !!!";
  else status = "Next player: " + (xTurn ? "X" : "0");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xTurn, setXTurn] = useState(true);
  const currentSquares = history[history.length -1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXTurn(!xTurn);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xTurn={xTurn} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

export default Game;
