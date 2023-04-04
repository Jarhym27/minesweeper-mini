
import './App.css';
import React,{useState, useEffect} from 'react';
import Board from './component/Board';

export const Minesweeper = React.createContext()

function App() {
  const numBomb = 8;
 const [board, setBoard] = useState([
  [1,2],
  [3,4]
 ])
 const [gameOver, setGameOver] = useState(false);
 
 useEffect(() =>{
  const newBoard= [];
  let counter = 1;

 for (let row = 0; row < 10; row++){
     let row2 = []
  for(let col = 0; col < 10; row++){
     row2.push(counter)
     counter++;
  }
   newBoard.push(row) 
 }
 }, [])
 
  return (
    <Minesweeper.Provider value={{board, setBoard}}>
     <Board/>
    </Minesweeper.Provider>
  )
    
  
}

export default App;
