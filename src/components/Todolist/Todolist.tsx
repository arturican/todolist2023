import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodolistType} from "../../App";


export const Todolist = (props: TodolistType) => {

    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(event.key === 'Enter'){
            addTask()
        }
    }

    const addTask = () =>{
        if(newTask.trim() !== ''){
            props.addTask(newTask)
            setNewTask('')
        }else {
            setError('Title is required')
        }

    }

    const callBackRemoveTask = (id: string) => {
        props.removeTask(id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTask}
                       onChange={onClickHandler}
                       onKeyPress={onKeyPressHandler}
                       className= {error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={t.isDone} onChange={(e)=>{props.changeStatus(t.id, e.currentTarget.checked)}}/>
                            <span>{t.title}</span>
                            <button onClick={() => {callBackRemoveTask(t.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.filteredTask('all')
                }} className={props.filter === 'all' ? 'active-filter': ''}>All
                </button>
                <button onClick={() => {
                    props.filteredTask('active')
                }} className={props.filter === 'active' ? 'active-filter': ''}>Active
                </button>
                <button onClick={() => {
                    props.filteredTask('completed')
                }} className={props.filter === 'completed' ? 'active-filter': ''}>Completed
                </button>
            </div>
        </div>
    );
};

