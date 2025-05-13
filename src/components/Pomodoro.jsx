import Header from "./Header.jsx";
import ProgressBar from "./todolistComponents/ProgressBar.jsx";
import { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
    // defalut settings of Pomodoro
    const defaultPomodoro = 25;
    const defaultBreak = 5;
    const defaultSessions = 1;

    const [Pomodoro,setPomodoro] = useState(defaultPomodoro);
    const [Breaktime, setBreaktime] = useState(defaultBreak);
    const [Sessions, setSessions] = useState(defaultSessions);

    let [intialTimer,setintialTimer] = useState(25 * 60);
    const [timerStart, setTimerStart] = useState(false);
    const [timer, setTimer] = useState(intialTimer);
    const intervalRef = useRef(null);
    const inputFocus = useRef(null);

    function formatTimer(seconds) {
        let hour = Math.floor(seconds / 3600)
        let min = Math.floor((seconds % 3600) / 60);
        let sec = seconds % 60;
        return `${hour ? (hour < 10 ? '0' : '') + hour + ':' : ''}${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
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

    const [showTimerSettings, setShowTimerSettings] = useState(false);
    const toggleShowTimerSetting = () => setShowTimerSettings(prev => !prev);
    useEffect(() => {
        if (showTimerSettings && inputFocus.current) inputFocus.current.focus();
    }, [showTimerSettings])

    function timerSettingHandler(e) {
        e.preventDefault(); 
        let newTime = Pomodoro * 60;
        setintialTimer(newTime);
        setTimer(newTime);
        setShowTimerSettings(false);
    }

    function settingsResetter() {
        setPomodoro(defaultPomodoro);
        setBreaktime(defaultBreak);
        setSessions(defaultSessions);
    }

    return (
        <>
            <div className="pomodoro" style={showTimerSettings ? { filter: "blur(10px) brightness(0.9)" } : {}}>
                <Header />
                <div className="options timerOption">
                    <button onClick={toggleShowTimerSetting} className='newTask'>
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
            {showTimerSettings && <form className="taskDialogBox timerSettings" onSubmit={timerSettingHandler}>
                <div className="settinghead">
                    <span>Set Pomodoro</span>
                    <img src="https://img.icons8.com/?size=100&id=71200&format=png&color=000000" alt="closeIcon" onClick={toggleShowTimerSetting} />
                </div>
                <div className="settings">
                    <label>
                        Pomodoro
                        <input value={Pomodoro} onChange={(e) => setPomodoro(e.target.value)} ref={inputFocus} type="number" />
                        <small>minutes</small>
                    </label>
                    <label>
                        Break
                        <input value={Breaktime} onChange={(e) => setBreaktime(e.target.value)} type="number" />
                        <small>minutes</small>
                    </label>
                    <label>
                        Sessions
                        <input value={Sessions} onChange={(e) => setSessions(e.target.value)} type="number" />
                        <small>count</small>
                    </label>
                </div>
                <div className="btns timerOp">
                    <button onClick={settingsResetter} type="button" id="resetbtn">Reset All</button>
                    <div className="opBtns">
                        <button type="button" onClick={toggleShowTimerSetting}>Close</button>
                        <button type="submit">Save Changes</button>
                    </div>
                </div>
            </form>}
        </>
    )
}