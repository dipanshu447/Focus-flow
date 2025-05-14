import Task from './components/todolistComponents/TaskBox.jsx';
import Menu from './components/MenuBar.jsx';
import TodoList from './components/TodoList.jsx';
import Pomodoro from './components/Pomodoro.jsx';
import { useState } from 'react';

export default function App() {
  const [Tasks, setTask] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("Tasks"));
      return savedTasks ? savedTasks : [];
    } catch (error) {
      console.log("Invalid json in local storage, " + error);
      localStorage.removeItem("Tasks");
      return [];
    }
  });

  function taskToggle(id) {
    setTask(prev => {
      let copy = [...prev];
      copy[id].done = !copy[id].done;
      localStorage.setItem("Tasks", JSON.stringify(copy));
      return copy;
    })
  }

  function addTask(newTask) {
    setTask(prev => {
      const updated = [...prev, { name: newTask, done: false }];
      localStorage.setItem("Tasks", JSON.stringify(updated));
      return updated;
    });
  }

  function removeTask(id) {
    setTask(prev => {
      let copy = [...prev];
      copy.splice(id, 1);
      localStorage.setItem("Tasks", JSON.stringify(copy));
      return copy;
    })
  }

  let userTasks = Tasks.map((task, index) => (
    <Task key={index + 1} id={index} deleteTask={removeTask} task={task.name} taskDone={task.done} taskToggle={taskToggle} />
  ));

  let finishedTasksCount = Tasks.reduce((count, taskVal) => {
    if (taskVal.done) count++;
    return count;
  }, 0);

  const [page, setPage] = useState("ToDolist");

  return (
    <>
      <Menu setPage={setPage} />
      {page == "Welcome" && <h1>Welcome</h1>}
      {page == "ToDolist" && <TodoList
        addTask={addTask}
        remainingTaskCount={finishedTasksCount}
        taskLength={Tasks.length}
        userTasks={userTasks}
      />}
      {page == "Pomodoro" && <Pomodoro />}
      {page == "Coming Soon" && <h1>Coming Soon</h1>}
    </>
  )
}