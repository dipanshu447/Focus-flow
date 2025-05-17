import Task from './components/todolistComponents/TaskBox.jsx';
import Menu from './components/MenuBar.jsx';
import TodoList from './components/TodoList.jsx';
import Pomodoro from './components/Pomodoro.jsx';
import Welcome from './components/Welcome.jsx';
import About from './components/About.jsx';
import { useEffect, useState, useRef } from 'react';

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
    localStorage.setItem("UserName", newUsername);
    setusernameDialogBox(false);
  }

  const [collapsed, setcollapsed] = useState(true);
  const toggleCollapse = () => setcollapsed(prev => !prev);

  const noficationPerms = useRef(false);
  useEffect(() => {
    async function getNotifyPerms() {
      if (Notification.permission === 'granted') {
        noficationPerms.current = true;
      } else if (Notification.permission !== 'denied') {
        let perms = await Notification.requestPermission();
        noficationPerms.current = perms === 'granted' ? true : false;
      }
    }
    getNotifyPerms();
  }, []);

  function showNotify(title, bodyText) {
    if (noficationPerms.current) {
      const pomoNotify = new Notification(title, {
        body: bodyText
      });

      setTimeout(() => {
        pomoNotify.close();
      }, 5000);
    }
  }

  return (
    <>
      <Menu
        setPage={setPage}
        collapse={collapsed}
        changeCollapse={toggleCollapse}
        style={usernameDialogBox ? { filter: "blur(10px) brightness(0.9)" } : {}}
      />
      {page == "Welcome" && <Welcome
        style={usernameDialogBox ? { filter: "blur(10px) brightness(0.9)" } : {}}
        startFocus={setPage}
        editName={setUsername}
      />}
      {page == "Pomodoro" && <Pomodoro username={username} showNotify={showNotify} />}
      {page == "ToDolist" && <TodoList
        username={username}
        addTask={addTask}
        remainingTaskCount={finishedTasksCount}
        taskLength={Tasks.length}
        userTasks={userTasks}
        showNotify={showNotify}
      />}
      {page == "About" && <About />}
      {usernameDialogBox && <form className="taskDialogBox UserNameBox" onSubmit={userNameHandler}>
        <label>What's your name</label>
        <input type="text" name='UserName' required />
        <div className="btns">
          <button type='submit'>Start Grinding!</button>
        </div>
      </form>}
      {collapsed && <button className="openCollapse" onClick={toggleCollapse}>
        <img src="https://img.icons8.com/?size=100&id=PpSBa7iaIak3&format=png&color=ffffff" alt="menuIcon" />
      </button>}
    </>
  )
}