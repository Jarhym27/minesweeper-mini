import React ,{useState, useEffect, useContext} from 'react';
import { Minesweeper } from '../App';
import './Timer.css'

const Timer = () =>{
    const [time, setTime ] = useState(0)
    const {gameOver} = useContext(Minesweeper)

    useEffect(() => {
        let timeId;
        if(!gameOver){
            timeId = setInterval(()=>{
                setTime((prevTime) => prevTime + 1)
            }, 1000)
        }
        return () => clearInterval(timeId);
    }, [gameOver]);

    const minutes = Math.floor(time/60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return(<div className="timer">
        {minutes}:{seconds}
    </div>) 

}
export default Timer;