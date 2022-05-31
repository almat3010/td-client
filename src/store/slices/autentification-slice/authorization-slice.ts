import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {formAuth, IAutentificationState} from "./types";
import {RootState, Selector} from "../../store";
import {IRTokenB, IUserAuthB} from "../../../api/requests/auth-request/types";
import AuthRequest from "../../../api/requests/auth-request/auth-request";
import TasksSlice from "../tasks-slice/tasks-slice";

export const asyncSignIn = createAsyncThunk(
    'authorization/asyncSignIn',
    async (_, thunkAPI) => {
        const state = (thunkAPI.getState() as RootState).authorization;
        if(!state.login || !state.password){
            return thunkAPI.rejectWithValue('empty input')
        }else{
            try{
                const body: IUserAuthB = {
                    login: state.login,
                    password: state.password
                }
                const {data} = await AuthRequest.auth(body)
                return data
            }catch (e) {
                return thunkAPI.rejectWithValue(e)
            }
        }
    }
)

export const asyncSignUp = createAsyncThunk(
    'authorization/asyncSignUp',
    async (_, thunkAPI) =>{
        const state = (thunkAPI.getState() as RootState).authorization;
        if(!state.login || !state.password){
            return thunkAPI.rejectWithValue('empty input')
        }else{
            try{
                const body: IUserAuthB = {
                    login: state.login,
                    password: state.password
                }
                const {data} = await AuthRequest.reg(body)
                return data
            }catch (e) {
                return thunkAPI.rejectWithValue(e)
            }
        }
    }
)

export const asyncRefreshAuth = createAsyncThunk(
    'authorization/asyncRefreshAuth',
    async (_, thunkAPI) =>{
            try{
                const body: IRTokenB = {
                    refreshT:JSON.parse(
                        localStorage.getItem('refresh_token')||''
                    )

                }
                const {data} = await AuthRequest.refreshToken(body)
                return data
            }catch (e) {
                return thunkAPI.rejectWithValue(e)
            }
    }
)

const initialState: IAutentificationState = {
    timer: 0,
    createTimer: 0,
    auth: false,
    typeForm: formAuth.SIGN_IN,
    login: '',
    password: '',
    error: '',
}

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers:{
        changeAccessCreateTimer: (state,action:PayloadAction<number>) =>{
            state.createTimer = action.payload
        },
        changeAccessTimer: (state,action:PayloadAction<number>) =>{
            state.timer = action.payload
        },
        changeLogin: (state,action:PayloadAction<string>) =>{
            state.login = action.payload
        },
        changePassword: (state,action:PayloadAction<string>) =>{
            state.password = action.payload
        },
        formChanger: (state,action:PayloadAction<formAuth>) =>{
            state.typeForm = action.payload
        },
        exit: (state) =>{
            localStorage.clear()
            state.auth = false
            state.typeForm = formAuth.SIGN_IN
        },
        changeAuth:(state, action: PayloadAction<boolean>) =>{
            state.auth = action.payload
        }

    },
    extraReducers: {
        [asyncSignUp.fulfilled.type]:(state, action: PayloadAction<any>)=>{
            localStorage.setItem('access_token',JSON.stringify(action.payload.accessT))
            localStorage.setItem('refresh_token',JSON.stringify(action.payload.refreshT))
            localStorage.setItem('time',JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_access_date',JSON.stringify(action.payload.access_date))
            //state.login = ''
            state.password = ''
            state.error = ''
            state.auth = true
            state.typeForm = formAuth.EXIT
        },
        [asyncSignIn.fulfilled.type]:(state,action: PayloadAction<any>)=>{
            localStorage.setItem('access_token',JSON.stringify(action.payload.accessT))
            localStorage.setItem('refresh_token',JSON.stringify(action.payload.refreshT))
            localStorage.setItem('time',JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_access_date',JSON.stringify(action.payload.access_date))
            //state.login = ''
            state.password = ''
            state.error = ''
            state.auth = true
            state.typeForm = formAuth.EXIT
        },
        [asyncSignIn.rejected.type]:(state,action: PayloadAction<any>)=>{
            state.auth = false
            state.login = ''
            state.password = ''
            state.typeForm = formAuth.SIGN_IN
        },
        [asyncSignUp.rejected.type]:(state,action: PayloadAction<any>)=>{
            state.auth = false
            state.login = ''
            state.password = ''
            state.typeForm = formAuth.SIGN_IN
        },
        [asyncRefreshAuth.fulfilled.type]:(state,action: PayloadAction<any>)=>{
            localStorage.setItem('access_token',JSON.stringify(action.payload.accessT))
            localStorage.setItem('refresh_token',JSON.stringify(action.payload.refreshT))
            localStorage.setItem('time',JSON.stringify(action.payload.access_expiresIn))
            localStorage.setItem('create_access_date',JSON.stringify(action.payload.access_date))
            //state.login = ''
            state.password = ''
            state.error = ''
            state.auth = true
            state.typeForm = formAuth.EXIT
        },
        [asyncRefreshAuth.rejected.type]:(state,action: PayloadAction<any>)=>{
            //state.login = ''
            state.password = ''
            state.typeForm = formAuth.SIGN_IN
            state.auth = false
        },
    }
})
export const {changeLogin,
    changePassword,
    exit,
    formChanger,changeAuth, changeAccessTimer, changeAccessCreateTimer} = authorizationSlice.actions
export default authorizationSlice

