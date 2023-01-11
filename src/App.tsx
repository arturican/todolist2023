import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";


export type TodolistType = {
    title: string
    tasks: Array<TodolistTasksType>
    removeTask: (id: string) => void
    filteredTask: (filter: FilterTaskType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterTaskType
}
type TodolistTasksType = {
    id: string
    title: string
    isDone: boolean
}

type FilterTaskType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterTaskType>('all')
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const filteredTask = (filter: FilterTaskType) => {
        setFilter(filter)
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
     const  task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title='What lo learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                filteredTask={filteredTask}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
