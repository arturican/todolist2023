import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TodolistAllType} from "../../App";


export const Todolist = (props: TodolistAllType) => {

    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        if (newTask.trim() !== '') {
            props.addTask(newTask, props.id)
            setNewTask('')
        } else {
            setError('Title is required')
        }

    }

    const callBackRemoveTask = (id: string, todolitstsId: string) => {
        props.removeTask(id, todolitstsId)
    }

    const callBackRemoveTodolist = (todolitstsId: string) => {
        props.removeTodolist(todolitstsId)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => callBackRemoveTodolist((props.id))}>x</button>
            </h3>
            <div>
                <input value={newTask}
                       onChange={onClickHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox' checked={t.isDone} onChange={(e) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id)
                            }}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                callBackRemoveTask(t.id, props.id)
                            }}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.filteredTask('all', props.id)
                }} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={() => {
                    props.filteredTask('active', props.id)
                }} className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={() => {
                    props.filteredTask('completed', props.id)
                }} className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};

