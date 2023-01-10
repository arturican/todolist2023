import React from 'react';
import {TodolistType} from "../../App";


export const Todolist = (props: TodolistType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type='checkbox' checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
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

