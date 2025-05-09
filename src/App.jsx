import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';
import CreateTask from './components/CreateTask.jsx';
import Menu from './components/MenuBar.jsx';
import { useState } from 'react';

// IDEAs
// Yk progress that streak thingy we see on apps that circular thing if wo add hujaye yk 
// By the end of the day it shows that itne percent you did completed

export default function App() {
  const [Tasks, setTask] = useState(["Finish reading the book","Eat food"]);

  let userTasks = Tasks.map((task,index) => (
    <Task key={task} id={index} deleteTask={setTask} task={task}/>
  ));
  
  return (
    <>
    <Menu />
    <div className="todoList">
      <div className='main'>
        <Header />
        <section>
          {userTasks}
        </section>
      </div>
      <CreateTask addTask={setTask} />
    </div>
    </> 
  )
}