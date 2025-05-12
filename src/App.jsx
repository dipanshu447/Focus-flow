import Task from './components/todolistComponents/TaskBox.jsx';
import Menu from './components/MenuBar.jsx';
import TodoList from './components/TodoList.jsx';
import Pomodoro from './components/Pomodoro.jsx';
import { useState } from 'react';

export default function App() {
  const [Tasks, setTask] = useState(["Finish reading the book", "Eat food","Buy foood","Talk to friends","Clean Emails","so bored","but keep trying my best","i hope its full now","maybe"]);
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

  const [page, setPage] = useState("ToDolist");

  return (
    <>
      <Menu setPage={setPage}/>
      {page == "Welcome" && <h1>Welcome</h1>}
      {page == "ToDolist" && <TodoList
        addTask={addTask}
        remainingTaskCount={finishedTasksCount}
        taskDoneLength={taskDone.length}
        taskLength={Tasks.length}
        userTasks={userTasks}
      />}
      {page == "Pomodoro" && <Pomodoro />}
      {page == "Coming Soon" && <h1>Coming Soon</h1>}
    </>
  )
}