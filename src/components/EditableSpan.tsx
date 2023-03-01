import React, {ChangeEvent, useState} from 'react';
import {isNumber} from "util";

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
        ? <input value={props.OLDtitle} onBlur={onDoubleClickHandler} autoFocus onChange={onChangeHandler}/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.OLDtitle}</span>
    );
};

