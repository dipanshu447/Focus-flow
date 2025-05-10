import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';
import CreateTask from './components/CreateTask.jsx';
import Menu from './components/MenuBar.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import { useState } from 'react';

export default function App() {
  const [Tasks, setTask] = useState(["Finish reading the book", "Eat food"]);

  let userTasks = Tasks.map((task, index) => (
    <Task key={task} id={index} deleteTask={setTask} task={task} />
  ));

  return (
    <>
      <Menu />
      <div className="todoList">
        <div className='main'>
          <Header />
          <div className="subHead">
            <div className="leftOver">3 Tasks Remaining.</div>
            <div className="status">
              <small>30%</small>
              <ProgressBar progress='30'/>
            </div>
          </div>
          <section>
            {userTasks}
          </section>
        </div>
        <CreateTask addTask={setTask} />
      </div>
    </>
  )
}