import Task from './components/todolistComponents/TaskBox.jsx';
import Menu from './components/MenuBar.jsx';
import TodoList from './components/TodoList.jsx';
import Pomodoro from './components/Pomodoro.jsx';
import Welcome from './components/Welcome.jsx';
import About from './components/About.jsx';
import { useEffect, useState } from 'react';

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

  const [page, setPage] = useState("Welcome");
  const [username, setUsername] = useState('User');
  const [usernameDialogBox, setusernameDialogBox] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("UserName");
    saved ? setUsername(saved) : setusernameDialogBox(true);
  }, []);

  function userNameHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newUsername = formData.get('UserName');
    setUsername(newUsername);
    localStorage.setItem("UserName",newUsername);
    setusernameDialogBox(false);
  }

  return (
    <>
      <Menu setPage={setPage} style={usernameDialogBox ? { filter: "blur(10px) brightness(0.9)" } : {}}/>
      {page == "Welcome" && <Welcome 
        style={usernameDialogBox ? { filter: "blur(10px) brightness(0.9)" } : {}}
        startFocus={setPage}
        editName={setUsername}
      />}
      {page == "Pomodoro" && <Pomodoro username={username} />}
      {page == "ToDolist" && <TodoList
        username={username}
        addTask={addTask}
        remainingTaskCount={finishedTasksCount}
        taskLength={Tasks.length}
        userTasks={userTasks}
      />}
      {page == "About" && <About/>}
      {usernameDialogBox && <form className="taskDialogBox UserNameBox" onSubmit={userNameHandler}>
        <label>What's your name</label>
        <input type="text" name='UserName' required />
        <div className="btns">
          <button type='submit'>Start Grinding!</button>
        </div>
      </form>}
    </>
  )
}