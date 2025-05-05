import { useState } from "react"

export default function Task({ task }) {
    const [taskDone, setTaskDone] = useState(false);

    function taskToggle() {
        setTaskDone(prev => !prev)
    }

    return (
        <article>
            <header>
                {taskDone ? <button onClick={taskToggle} ><img src="https://img.icons8.com/?size=100&id=82769&format=png&color=000000" alt="tickIcon" /></button> : <button onClick={taskToggle} style={{ padding: "12px" }}></button>}
                <p>{task}</p>
            </header>
            <footer>
                <button><img src="https://img.icons8.com/?size=100&id=67884&format=png&color=686868" alt="vertical-menu" /></button>
            </footer>
        </article>
    )
}