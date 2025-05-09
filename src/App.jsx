import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';
import CreateTask from './components/CreateTask.jsx';
import Menu from './components/MenuBar.jsx';
import { useState } from 'react';

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