import React from 'react';
import styles from './Tasks-page.module.scss'
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import TasksContainer from './taskContainer';
import {add, changeBack, deleteTasks} from "../../components/tasks/task/task-fun";
import {Dispatch, Selector} from "../../store/store";
import {changeBackground, changeTitleTask} from "../../store/slices/tasks-slice/tasks-slice";
import {onSubmit} from "../../components/auth/untils";
import {formAuth} from "../../store/slices/autentification-slice/types";

import FormButton from "../../components/form-button/FormButton";
import Changer from "../../components/changer/changer";
//<FormButton onClick={ e => onSubmit(formAuth.EXIT, dispatch, e) } text='Exit' />

const TaskPage = () => {
    const dispatch= Dispatch()
    const {titleInput}=Selector(state=>state.tasks)
    const user = Selector(state=> state.authorization.login)
    const count = Selector(state => state.tasks.countTasks)
    return (
        <>
            <header className={styles.head}>
                <div className={styles.changers}>
                <Changer img={1} dispatch={dispatch} onClick={changeBack} text={"default"}></Changer>
                <Changer img={2} dispatch={dispatch} onClick={changeBack} text={"5c"}></Changer>
                <Changer img={3} dispatch={dispatch} onClick={changeBack} text={"10c"}></Changer>
                <Changer img={4} dispatch={dispatch} onClick={changeBack} text={"15c"}></Changer>
                </div>
                <p className={styles.pTxt1}>Hello, {user}</p>
                <p className={styles.pTxt2}>Coins: {count}</p>
                <button className={styles.btn} onClick={e => onSubmit(formAuth.EXIT, dispatch, e)}> Exit </button>
            </header>
            <div className={styles.hero}>
                <div className={styles.title}><Title/></div>
                <input value ={titleInput}
                       className={styles.addInput}
                       type = "text"
                       placeholder='новая задача'
                       onChange={e=>dispatch(changeTitleTask(e.target.value))} />
                <div className={styles.controller}>
                        <Button color='white' text='удалить всё' onClick={deleteTasks} dispatch = {dispatch} />
                        <Button color='#32CD32' text='добавить' onClick={add} dispatch = {dispatch} />
                </div>
                <TasksContainer/>
            </div>
        </>
    );
};

export default TaskPage;