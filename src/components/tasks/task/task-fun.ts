import {AppDispatch} from "../../../store/store";
import {
    addTask,
    asyncAddTask, asyncDeleteAllTask, asyncDeleteTask,
    asyncUpdateTask, changeBackground,
    deleteAllTask, deleteTaskByID,
    updateTask
} from "../../../store/slices/tasks-slice/tasks-slice";

export interface iAdd{
    (dispatch: AppDispatch) : void
}

export interface iUpdate{
    (id: number, dispatch: AppDispatch) : void
}

export interface iDeleteTasks{
    (dispatch: AppDispatch) : void
}

export interface iDeleteTask{
    (id: number, dispatch: AppDispatch) : void
}

export const add : iAdd= (dispatch) => {
    dispatch(addTask())
    dispatch(asyncAddTask())
}
export const update : iUpdate = (id, dispatch) => {
    dispatch(updateTask(id))
    dispatch(asyncUpdateTask(id))
}
export const deleteTasks : iDeleteTasks = (dispatch) => {
    dispatch(deleteAllTask())
    dispatch(asyncDeleteAllTask())
}
export const deleteTask : iDeleteTask = (id, dispatch) => {
    dispatch(deleteTaskByID(id))
    dispatch(asyncDeleteTask(id))
}

export interface iChange{
    (img: number, dispatch: AppDispatch) : void
}
export const changeBack :iChange = (img: number,dispatch) =>{
    dispatch(changeBackground(img))
}