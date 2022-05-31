import React from 'react';
import styles from './Task.module.scss'
import {ITask} from "../../../store/slices/tasks-slice/types";
import {Dispatch} from "../../../store/store";
import {deleteTask, update} from "./task-fun";

interface IProps{
    task :ITask
}

const Task: React.FC<IProps> = ({task}) => {
    const dispatch = Dispatch()
    return (
        <div className={styles.task}>
            <div>
                <input className={styles.input}
                       type = "checkbox"
                       checked={task.done}
                       onChange={() => update(task.id, dispatch)}
                       id={task.id.toString()}/>
                <label className={styles.anotherCheckBox} htmlFor={task.id.toString()}/>
            </div>
            <h2 style={{textDecoration:task.done?'line-through':'none'}} className={styles.title}>{task.title}</h2>
            <button onClick={() => deleteTask(task.id, dispatch)} className={styles.delete}></button>
        </div>
    );
};

export default Task;