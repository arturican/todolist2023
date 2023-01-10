import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";


export type TodolistType = {
    title: string
    tasks: Array<TodolistTasksType>
    removeTask: (id: number) => void
    filteredTask: (filter: FilterTaskType) => void
}
type TodolistTasksType = {
    id: number
    title: string
    isDone: boolean
}

type FilterTaskType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterTaskType>('all')
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const filteredTask = (filter: FilterTaskType) => {
        setFilter(filter)
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
            />
        </div>
    );
}

export default App;
