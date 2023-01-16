import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";


export type TodolistAllType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filteredTask: (filter: FilterTaskType, todolistId: string) => void
    addTask: (title: string,  todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterTaskType
    id: string
    removeTodolist: (todolistId: string) => void
}
type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistTasksStateType = {
    [key: string]: Array<TaskType>
}

type FilterTaskType = 'all' | 'completed' | 'active'

function App() {

 let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TodolistTasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    const filteredTask = (filter: FilterTaskType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
     const  task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})

    }



    return (
        <div className="App">
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks
                if (tl.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                }
                return (
                    <Todolist
                        key = {tl.id}
                        id = {tl.id}
                        title= {tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        filteredTask={filteredTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
                })

            }
        </div>
    );
}

export default App;
