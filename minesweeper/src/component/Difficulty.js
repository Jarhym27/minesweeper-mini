import React, {useContext, useState} from 'react'
import { Minesweeper } from '../App'

const Difficulty = () => {

const {difficulty, setDifficulty} = useContext(Minesweeper)

return (<div>
    <label>Difficult</label>
    <select
    name = "difficulty"
    id="difficulty"
    value={"difficulty"}
    onChange={(e) => setDifficulty(e.target.value)}>
   <option value="easy">Easy</option>
   <option value="medium">Medium</option>
   <option value="hard">Hard</option>
   </select>
</div>
)


}
export default Difficulty;