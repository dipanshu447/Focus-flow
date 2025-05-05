export default function CreateTask({addTask}) {

    function handleKey(event) {
        if(event.key == "Enter"){
            if(event.target.value.trim() == "") return;
            addTask(prev => [...prev, event.target.value]);
        }
    }

    return (
        <div className="createTask">
            <div>
                <img src="https://img.icons8.com/?size=100&id=3220&format=png&color=ffffff" alt="plus-img" />
                <input type="text" placeholder='Create new task' onKeyDown={handleKey}/>
            </div>
        </div>
    )
}