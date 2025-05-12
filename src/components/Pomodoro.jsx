import Header from "./Header.jsx";
import ProgressBar from "./todolistComponents/ProgressBar.jsx";
import { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
    const intialTimer = 5 * 60;
    const [timerStart, setTimerStart] = useState(false);
    const [timer, setTimer] = useState(intialTimer);
    const intervalRef = useRef(null);

    function formatTimer(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
    }

    useEffect(() => {
        if (timerStart) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setTimerStart(false);
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000)
        }
        else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [timerStart])

    function resetHandler() {
        setTimerStart(false);
        setTimer(intialTimer);
    }

    let progressPercent = ((intialTimer - timer) / intialTimer) * 100;

    return (
        <>
            <div className="pomodoro">
                <Header />
                <div className="options timerOption">
                    <button className='newTask'>
                        <img src="https://img.icons8.com/?size=100&id=359EtvQ5YRwA&format=png&color=ffffff" alt="plusIcon" />
                        Set Pomodoro
                    </button>
                </div>
                <div className="timer">
                    <ProgressBar strokeSize='15' CircleSize='350' progress={progressPercent}>
                        {formatTimer(timer)}
                    </ProgressBar>
                    <div className="buttons">
                        <button onClick={() => setTimerStart(prev => !prev)}>{timerStart ? "Pause" : "Start"}</button>
                        <button onClick={resetHandler}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    )
}