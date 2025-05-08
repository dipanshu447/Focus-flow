import { useState } from "react";

export default function CreateTask({addTask}) {
    const [input, setInput] = useState('');

    function handleKey(event) {
        if(event.key == "Enter" && input.trim() !== ""){
            addTask(prev => [...prev, input]);
            setInput('');
        }
    }

    return (
        <div className="createTask">
            <div>
                <img src="https://img.icons8.com/?size=100&id=3220&format=png&color=ffffff" alt="plus-img" />
                <input type="text" placeholder='Create new task' value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}/>
            </div>
        </div>
    )
}