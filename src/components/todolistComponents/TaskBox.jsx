// import { useState } from "react"

export default function Task({ task, id, deleteTask , taskDone, taskToggle}) {
    // const [taskDone, setTaskDone] = useState(false);

    // function taskToggle() {
    //     setTaskDone(prev => !prev)
    // }

    let checkedObj = {
        textDecoration: "line-through", 
        color: "#b1b1b1"
    };
    
    return (
        <article>
            <header>
                <label className="custom-checkbox">
                    <input type="checkbox" checked={taskDone} onChange={() => taskToggle(id)}/>
                    <span className="checkmark"></span>
                </label>
                <p style={taskDone ? checkedObj : {}}>{task}</p>
            </header>
            <footer>
                <button onClick={() => deleteTask(id)}><img src="https://img.icons8.com/?size=100&id=67884&format=png&color=686868" alt="vertical-menu" /></button>
            </footer>
        </article>
    )
}