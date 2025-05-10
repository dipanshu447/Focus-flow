import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';
import CreateTask from './components/CreateTask.jsx';
import Menu from './components/MenuBar.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import { useState } from 'react';

export default function App() {
  const [Tasks, setTask] = useState(["Finish reading the book", "Eat food"]);
  const [taskDone, setTaskDone] = useState(Tasks.map(e => false));

  function taskToggle(id) {
    setTaskDone(prev => {
      let copy = [...prev];
      copy[id] = !copy[id];
      return copy;
    })
  }

  function addTask(newTask) {
    setTask(prev => [...prev, newTask]);
    setTaskDone(prev => [...prev, false]);
  }

  function removeTask(id) {
    setTask(prev => {
      let copy = [...prev];
      copy.splice(id, 1);
      return copy;
    })

    setTaskDone(prev => {
      let copy = [...prev];
      copy.splice(id, 1);
      return copy;
    })
  }

  let userTasks = Tasks.map((task, index) => (
    <Task key={task} id={index} deleteTask={removeTask} task={task} taskDone={taskDone[index]} taskToggle={taskToggle} />
  ));

  let finishedTasksCount = taskDone.reduce((count, taskVal) => {
    if (taskVal) count++;
    return count;
  }, 0);

  let taskMessage = Tasks.length == 0 ? "No tasks yet. Add one to get started!" : (taskDone.length - finishedTasksCount) == 0 ? "You're all caught up. Great job!" : `${taskDone.length - finishedTasksCount} Tasks Remaining.`;

  let taskProgress = (finishedTasksCount / taskDone.length) * 100;
  let progressPercent = isNaN(taskProgress) ? 0 : Math.round(taskProgress);

  return (
    <>
      <Menu />
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
    </>
  )
}