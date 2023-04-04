import React,{useContext} from 'react';
import { Minesweeper } from '../App';
import './Board.css'

const Board = () => {
const {board} = useContext(Minesweeper)
return(
    <div className="container">
        {board.map((row, index) => {
            return <div key={index} className='row'>
            {
             row.map((num, ind) => {
                return(
                    <div 
                    key={ind}
                    className="col-sm"
                    onClick={()=> console.log(`you clicked this ${num}`)}>
                        {num}
                    </div>
                )
             })
        }
    </div>
})}
</div>
)}

export default Board