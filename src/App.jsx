import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';

export default function App() {
  return (
    <>
      <Header />
      <section>
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </section>
      <div className="createTask">
        <div>
          <img src="https://img.icons8.com/?size=100&id=3220&format=png&color=ffffff" alt="plus-img" />
          <input type="text" placeholder='Create new task' />
        </div>
      </div>
    </>
  )
}