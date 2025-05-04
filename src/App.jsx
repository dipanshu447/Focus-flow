import Header from './components/Header.jsx';
import Task from './components/TaskBox.jsx';
import CreateTask from './components/CreateTask.jsx';
import { useState } from 'react';

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
        <img className="darkMode" src="https://img.icons8.com/?size=100&id=45475&format=png&color=000000" alt="darkModeIcon" />
      <CreateTask />
    </>
  )
}