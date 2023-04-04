
import './App.css';
import React,{useState, useEffect} from 'react';
import Board from './component/Board';
import Timer from './component/Timer'
import Difficulty from './component/Difficulty';

export const Minesweeper = React.createContext()

function App() {
  const numBomb = 8;
  const board_size = 10;
 const [board, setBoard] = useState([])
 const [message, setMessage] = useState("");
 const [gameOver, setGameOver] = useState(false);

 const [difficulty, setDifficulty] = useState("easy")
 

useEffect(() => {
  const newBoard = generateBoard();
  setBoard(newBoard);
}, []);

const generateBoard = () => {
  let board = new Array(board_size);
  for (let i = 0; i < board_size; i++) {
    board[i] = new Array(board_size).fill(0);
  }

  let bombsPosition = 0;
  while (bombsPosition < numBomb) {
    let randomRow = Math.floor(Math.random() * board_size);
    let randomCol = Math.floor(Math.random() * board_size);
    if (board[randomRow][randomCol] === 0) {
      board[randomRow][randomCol] = "B";
      bombsPosition++;
    }
  }
  return board;
};


const handleLeftClick = (row, col) => {
  if (gameOver) return;
  let newBoard = [...board];
  if (newBoard[row][col] === "B") {
    setGameOver(true);
    setMessage("Game Over");
    revealBoard(newBoard);
    return;
  }
  newBoard[row][col] = countSurroundingBombs(row, col);
  setBoard(newBoard);
};

const handleRightClick = (e, row, col) => {
  e.preventDefault();
  if (gameOver) return;
  let newBoard = [...board];
  if (newBoard[row][col] === "F") {
    newBoard[row][col] = 0;
  } else {
    newBoard[row][col] = "F";
  }
  setBoard(newBoard);
};


const countSurroundingBombs = (row, col) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      let newRow = row + i;
      let newCol = col + j;
      if (
        newRow < 0 ||
        newRow >= board_size ||
        newCol < 0 ||
        newCol >= board_size
      )
        continue;
      if (board[newRow][newCol] === "B") count++;
    }
  }
  return count;
};

const revealBoard = (board) => {
  let newBoard = [...board];
  for (let i = 0; i < board_size; i++) {
    for (let j = 0; j < board_size; j++) {
      if (newBoard[i][j] === "B") {
        newBoard[i][j] = "X";
      } else {
        newBoard[i][j] = countSurroundingBombs(i, j);
      }
    }
  }
  setBoard(newBoard);
};

const renderSquare = (row, col) => {
  let className =
    "square" +
    (board[row][col] === "F" ? " flag" : "") +
    (board[row][col] === "X" ? " bomb" : "") +
    (board[row][col] > 0 ? " number" : "");

  let text = "";
  if (board[row][col] > 0) {
    text = board[row][col];
  } else if (board[row][col] === "F") {
    text = "flag";
  } else if (board[row][col] === "X") {
    text = "bomb";
  }

  return (
    <div
      key={`${row}-${col}`}
      className={className}
      onClick={() => handleLeftClick(row, col)}
      onContextMenu={(e) => handleRightClick(e, row, col)}
    >
      {text}
    </div>
  );
};

const renderBoard = () => {
  return board.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((square, colIndex) => {
          return renderSquare(rowIndex, colIndex);
        })}
      </div>
    );
  });
};

 const getBombs = () => {
  switch(difficulty){
    case "medium":
      return 15;
    case "hard":
      return 20;
    default:
      return 10
  }
}
 const [bombs, setBombs] = useState(getBombs())

 
  return (
    <Minesweeper.Provider value={{board, setBoard, gameOver, setGameOver, difficulty, setDifficulty, bombs, setBombs}}>
      <h1>Minesweeper</h1>
      <Difficulty/>
       <div className="message">{message}</div>
      <div className="board">{renderBoard()}</div> 
     {/* <Board/> */}
     <Timer/>
    </Minesweeper.Provider>
  )
    
  
}


export default App;
