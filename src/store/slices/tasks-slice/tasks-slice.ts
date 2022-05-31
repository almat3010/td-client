import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask, ITaskState} from "./types";
import TaskRequest from "../../../api/requests/task-request/task-request";
import {IATaskB, IUTaskB} from "../../../api/requests/task-request/types";
import {RootState} from "../../store";

export const asyncGetTask = createAsyncThunk(
    'tasks/asyncGetTask',
    async (_,{rejectWithValue}) =>{
        try {
            const {data} = await TaskRequest.getTasks()
            return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const asyncAddTask = createAsyncThunk(
    'tasks/asyncAddTask',
    async (_, {rejectWithValue, getState}) =>{
        const state: ITaskState = (getState() as RootState).tasks
        try {
            if(state.titleInput) {
                const body: IATaskB = {
                    title: state.titleInput,
                    done: false
                }
                const {data} = await TaskRequest.addTask(body)
                return data
            }
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const asyncUpdateTask = createAsyncThunk(
    'tasks/asyncUpdateTask',
    async (id: number,{rejectWithValue}) =>{
        try {
                const body: IUTaskB = {
                    id,
                    done: true
                }
                const {data} = await TaskRequest.updateTask(body)
                return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const asyncDeleteAllTask = createAsyncThunk(
    'tasks/asyncDeleteAllTask',
    async (_, {rejectWithValue}) =>{
        try {
            const {data} = await TaskRequest.deleteTask()
            return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const asyncDeleteTask = createAsyncThunk(
    'tasks/asyncDeleteTask',
    async (taskID: number, {rejectWithValue}) =>{
        try {
            const {data} = await TaskRequest.deleteTask(taskID)
            return data
        }catch (e) {
            return rejectWithValue(e)
        }
    }
)

const initialState: ITaskState = {
    titleInput: '',
    tasks: [],
    isRequestTask: false,
    img: 0,
    countTasks: 0
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        changeTitleTask: (state, action:PayloadAction<string>) => {
            state.titleInput=action.payload
        },
        addTask: (state) => {
            if(state.titleInput){
                const task: ITask={
                    id: Math.floor(Math.random()*100),
                    title: state.titleInput,
                    done: false,
                }
                state.tasks.unshift(task)
            }
        },
        updateTask: (state, action:PayloadAction<number>) =>{
            state.tasks.forEach(it=>{
                if(it.id === action.payload){
                    it.done =! it.done
                }
            })
            state.countTasks = 0
            state.tasks.forEach(it=> {
                if(it.done){
                    state.countTasks += 1
                }
            })
        },
        deleteAllTask: (state) =>{
            state.tasks = []
            state.countTasks = 0
        },
        deleteTaskByID: (state, action:PayloadAction<number>) =>{
            state.tasks.forEach((it, i)=>{
                if(it.id === action.payload){
                    state.tasks.splice(i,1)
                }
            })
            state.countTasks = 0
            state.tasks.forEach(it=> {
                if(it.done){
                    state.countTasks += 1
                }
            })
        },
        changeBackground: (state, action:PayloadAction<number>) =>{
            state.img = action.payload
        }
    },
    extraReducers:{
            [asyncGetTask.fulfilled.type]:(state, action:PayloadAction<ITask[]>) =>{
                state.countTasks = 0
                state.tasks = [...action.payload]
                state.tasks.reverse()
                state.isRequestTask = false
                state.tasks.forEach(it=> {
                    if(it.done){
                        state.countTasks += 1
                    }
                })
},
            [asyncAddTask.fulfilled.type]:state =>{
                state.titleInput = ''
            }
        }
    })

export const {changeTitleTask, addTask, updateTask, deleteTaskByID, deleteAllTask, changeBackground} = taskSlice.actions
export default taskSlice