import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";


export type TodolistType = {
  title: string
  tasks: Array<TodolistTasksType>
}
type TodolistTasksType = {
  id: number
  title: string
  isDone: boolean
}

function App() {

const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]

  return (
    <div className="App">
    <Todolist title = 'What lo learn' tasks = {tasks1}/>
    <Todolist title = 'Movies' tasks = {tasks2}/>
    </div>
  );
}

export default App;
