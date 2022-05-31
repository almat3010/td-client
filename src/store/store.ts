import {configureStore} from "@reduxjs/toolkit";
import authorizationSlice from './slices/autentification-slice/authorization-slice'
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
import taskSlice from "./slices/tasks-slice/tasks-slice";

const store = configureStore ({
    reducer:{
        authorization : authorizationSlice.reducer,
        tasks: taskSlice.reducer
    },
    devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const Selector: TypedUseSelectorHook<RootState> = useSelector
export const Dispatch = () => useDispatch<AppDispatch>()
export default store