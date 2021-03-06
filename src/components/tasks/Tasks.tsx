import React, {useEffect} from 'react';
import styles from './Tasks.module.scss'
import Task from "./task/Task";
import {ITask} from "../../store/slices/tasks-slice/types";
import {Dispatch} from "../../store/store";
import {asyncGetTask} from "../../store/slices/tasks-slice/tasks-slice";

interface IProps{
    isGetTasksRequest: boolean,
    tasks: ITask[],
}

const Tasks :React.FC<IProps> = ({isGetTasksRequest,tasks}) => {
    const dispatch = Dispatch()
    useEffect(()=>{
        if(!isGetTasksRequest){
            dispatch(asyncGetTask())
        }
    },[])
    return (
            <ul className={styles.list}>
                {tasks.map(task=>
                    <Task key={task.id} task={task}/>
                )}
            </ul>
    );
};
// {tasks.map(task=><Task key={task.id} task={task}/>)}
export default Tasks;