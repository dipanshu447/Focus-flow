import Header from './Header.jsx';
import CreateTask from './todolistComponents/CreateTask.jsx';
import ProgressBar from './todolistComponents/ProgressBar.jsx';

export default function TodoList({addTask, taskDoneLength, taskLength,remainingTaskCount, userTasks}) {

    let taskMessage = taskLength == 0 ? "No tasks yet. Add one to get started!" : (taskDoneLength - remainingTaskCount) == 0 ? "You're all caught up. Great job!" : `${taskDoneLength - remainingTaskCount} Tasks Remaining.`;

    let taskProgress = (remainingTaskCount / taskDoneLength) * 100;
    let progressPercent = isNaN(taskProgress) ? 0 : Math.round(taskProgress);

    return (
        <div className="todoList">
            <div className='main'>
                <Header />
                <div className="subHead">
                    <div className="leftOver">{taskMessage}</div>
                    <div className="status">
                        <small>{progressPercent}%</small>
                        <ProgressBar progress={progressPercent} />
                    </div>
                </div>
                <section>
                    {userTasks}
                </section>
            </div>
            <CreateTask addTask={addTask} />
        </div>
    )
}