import { useState } from "react"

export default function Task({ task }) {
    const [taskDone, setTaskDone] = useState(false);

    function taskToggle() {
        setTaskDone(prev => !prev)
    }

    return (
        <article>
            <header>
                <label className="custom-checkbox">
                    <input type="checkbox" checked={taskDone} onChange={taskToggle}/>
                    <span className="checkmark"></span>
                </label>
                <p>{task}</p>
            </header>
            <footer>
                <button><img src="https://img.icons8.com/?size=100&id=67884&format=png&color=686868" alt="vertical-menu" /></button>
            </footer>
        </article>
    )
}