import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type SuperInputProps = {
    callBack: (title: string) => void
}


export const SuperInput = (props: SuperInputProps) => {

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
            props.callBack(newTask)
            setNewTask('')
        } else {
            setError('Title is required')
        }

    }

    return (
        <div>
            <input value={newTask}
                   onChange={onClickHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

