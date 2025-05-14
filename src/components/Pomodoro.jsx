import Header from "./Header.jsx";
import ProgressBar from "./todolistComponents/ProgressBar.jsx";
import { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
    const defaultPomodoro = 25;
    const defaultBreak = 5;
    const defaultSessions = 1;

    const [Pomodoro, setPomodoro] = useState(defaultPomodoro);
    const [Breaktime, setBreaktime] = useState(defaultBreak);
    const [Sessions, setSessions] = useState(defaultSessions);

    let [intialTimer, setintialTimer] = useState(defaultPomodoro * 60);
    const [timerStart, setTimerStart] = useState(false);
    const [timer, setTimer] = useState(intialTimer);
    const intervalRef = useRef(null);
    const inputFocus = useRef(null);

    const PomodoroCount = useRef(0);
    const BreakCount = useRef(0);
    const BreakTimer = useRef(false);
    const [currentDate, setcurrentDate] = useState(new Date().toDateString());
    const [TotalStudySeconds,setTotalStudySeconds] = useState(() => {
        const saved = localStorage.getItem("TotalStudiedSeconds");
        const savedDate = localStorage.getItem("LastStudyDate");
        const today = new Date().toDateString();

        if(savedDate !== today){
            setcurrentDate(today);
            localStorage.setItem("TotalStudiedSeconds",0);
            localStorage.setItem("LastStudyDate",today);
            return 0;
        }

        return saved ? Number(saved) : 0;
    });

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
                    if (prev < 1) {
                        clearInterval(intervalRef.current);
                        if (!BreakTimer.current) {
                            PomodoroCount.current += 1;
                            setTotalStudySeconds(prev => {
                                const updated = prev + Pomodoro * 60;
                                localStorage.setItem("TotalStudiedSeconds",updated);
                                return updated;
                            });
                            if (PomodoroCount.current == Sessions) {
                                setTimerStart(false);
                                return 0;
                            } else {
                                BreakTimer.current = true;
                                setintialTimer(Breaktime * 60);
                                setTimer(Breaktime * 60);
                                setTimerStart(true);
                                return Breaktime * 60;
                            }
                        } else {
                            BreakCount.current += 1;
                            BreakTimer.current = false;
                            setintialTimer(Pomodoro * 60);
                            setTimer(Pomodoro * 60);
                            setTimerStart(true);
                            return Pomodoro * 60;
                        }
                    }
                    return prev - 1;
                })
            }, 1000)
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [timerStart, BreakTimer.current]);

    useEffect(() => {
        const checkDate = setInterval(() => {
            const today = new Date().toDateString();

            if(today !== currentDate){
                setcurrentDate(today);
                setTotalStudySeconds(0);
                localStorage.setItem("TotalStudiedSeconds",0);
                localStorage.setItem("LastStudyDate",today);
            }

        }, 60000)

        return () => clearInterval(checkDate);
    }, [currentDate])

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
                    <small className="studyhours">
                        Time Studied Today : {(TotalStudySeconds / 3600).toFixed(1)}hr
                    </small>
                    <button onClick={toggleShowTimerSetting} className='newTask'>
                        <img src="https://img.icons8.com/?size=100&id=2969&format=png&color=ffffff" alt="settingIcon" />
                        Settings
                    </button>
                </div>
                <div className="timer">
                    <div className="timertypes">
                        <button style={!BreakTimer.current ? { borderBottomColor: "black" } : {}}>Pomodoro<b>{PomodoroCount.current}</b></button>
                        <button style={BreakTimer.current ? { borderBottomColor: "black" } : {}}>Break<b>{BreakCount.current}</b></button>
                    </div>
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
                    <span>Settings</span>
                    <img src="https://img.icons8.com/?size=100&id=71200&format=png&color=000000" alt="closeIcon" onClick={toggleShowTimerSetting} />
                </div>
                <div className="settings">
                    <label>
                        Pomodoro
                        <input min={1} value={Pomodoro} onChange={(e) => setPomodoro(Number(e.target.value))} ref={inputFocus} type="number" />
                        <small>minutes</small>
                    </label>
                    <label>
                        Break
                        <input min={1} value={Breaktime} onChange={(e) => setBreaktime(Number(e.target.value))} type="number" />
                        <small>minutes</small>
                    </label>
                    <label>
                        Sessions
                        <input min={1} value={Sessions} onChange={(e) => setSessions(Number(e.target.value))} type="number" />
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