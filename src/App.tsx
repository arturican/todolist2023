import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {SuperInput} from "./components/SuperInput";
import {EditableSpan} from "./components/EditableSpan";


export type TodolistAllType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    filteredTask: (filter: FilterTaskType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterTaskType
    id: string
    removeTodolist: (todolistId: string) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
    editTodolist: (todolistId: string, newTitle: string) => void
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
        /* let todolistTasks = tasks[todolistId]
         tasks[todolistId] = todolistTasks.filter(t => t.id !== id)*/
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const filteredTask = (filter: FilterTaskType, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: filter} : t))
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})

    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1();
        setTodolists([...todolists, {id: newTodolistId, title: title, filter: 'all'}])
        setTasks({
            ...tasks, [newTodolistId]: [{id: v1(), title: 'Rest API', isDone: true},
                {id: v1(), title: 'GraphQL', isDone: false},]
        })
    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }


    const editTodolist = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, title: newTitle} : t))
    }


    return (
        <div className="App">
            <SuperInput callBack={addTodolist}/>

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
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        filteredTask={filteredTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTask={editTask}
                        editTodolist={editTodolist}
                    />
                )
            })

            }
        </div>
    );
}

export default App;
