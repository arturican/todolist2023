import React, {ChangeEvent, useState} from 'react';

type PropsType  = {
    OLDtitle: string
    callBack: (newTitle: string) => void

}

export const EditableSpan = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState(props.OLDtitle)
    const [edit, setEdit] = useState(false);
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

   const onChangeHandler = (e:  ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
        ? <input onChange={onChangeHandler} value={newTitle} onBlur={onDoubleClickHandler} autoFocus />
        : <span onDoubleClick={onDoubleClickHandler}  >{props.OLDtitle}</span>
    );
};

