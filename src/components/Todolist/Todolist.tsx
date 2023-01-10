import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodolistType} from "../../App";


export const Todolist = (props: TodolistType) => {

    const [newTask, setNewTask] = useState('')

    const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            addTask()
        }
    }

    const addTask = () =>{
        props.addTask(newTask)
        setNewTask('')
    }

    const callBackRemoveTask = (id: string) => {
        props.removeTask(id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTask} onChange={onClickHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {callBackRemoveTask(t.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.filteredTask('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.filteredTask('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.filteredTask('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

