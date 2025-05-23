import Header from './Header.jsx';
import ProgressBar from './todolistComponents/ProgressBar.jsx';
import { useState, useRef, useEffect } from 'react';

export default function TodoList({ addTask, taskLength, remainingTaskCount, userTasks, username, showNotify }) {

    let taskMessage = taskLength == 0 ? "No tasks yet. Add one to get started!" : (taskLength - remainingTaskCount) == 0 ? "You're all caught up. Great job!" : `${taskLength - remainingTaskCount} Tasks Remaining.`;

    let taskProgress = (remainingTaskCount / taskLength) * 100;
    let progressPercent = isNaN(taskProgress) ? 0 : Math.round(taskProgress);

    function handleInput(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        let taskInput = data.get('task');
        if (taskInput.trim() !== "") addTask(taskInput);
        e.target.reset();
        toggleShowAddTask();
    }

    const [showAddTask, setshowAddTask] = useState(false);
    function toggleShowAddTask() {
        setshowAddTask(prev => !prev);
    }

    const inputFocus = useRef(null);
    useEffect(() => {
        if (showAddTask && inputFocus.current) inputFocus.current.focus();
    }, [showAddTask])

    useEffect(() => {
        if((taskLength - remainingTaskCount) == 0 && !(taskLength == 0)){
            showNotify("All Tasks Done","Grind complete. Rest well, champ.")
        }
    },[userTasks])

    return (
        <div className='todoList-container'>
            <div className="todoList" style={showAddTask ? { filter: "blur(10px) brightness(0.9)" } : {}}>
                <div className='main'>
                    <Header username={username}/>
                    <div className="subHead">
                        <div className="leftOver">{taskMessage}</div>
                        <div className="status">
                            <small>{progressPercent}%</small>
                            <ProgressBar
                                strokeSize='5'
                                CircleSize='35'
                                progress={progressPercent}
                            />
                        </div>
                    </div>
                    <div className="options">
                        <button className='newTask' onClick={toggleShowAddTask}>
                            <img src="https://img.icons8.com/?size=100&id=3220&format=png&color=ffffff" alt="plusIcon" />
                            New Task
                        </button>
                        {/* <button className='filter'>
                            <img src="https://img.icons8.com/?size=100&id=10751&format=png&color=000000" alt="plusIcon" />
                            Filters
                        </button> */}
                    </div>
                    <section>
                        {userTasks}
                    </section>
                </div>
            </div>
            {showAddTask && <form className="taskDialogBox" onSubmit={handleInput}>
                <label>Add new task</label>
                <input ref={inputFocus} type="text" name='task' required />
                <div className="btns">
                    <button type='button' onClick={toggleShowAddTask}>Back</button>
                    <button type='submit'>Add</button>
                </div>
            </form>}
        </div>
    )
}