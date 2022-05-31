import React, {useEffect} from 'react';
import './App.scss';
import {Routes, Route, Navigate} from 'react-router-dom'
import TaskPage from "./pages/tasks-page/TaskPage";
import AuthContainer from "./components/auth/authContainer";
import {Dispatch, Selector} from "./store/store";
import {
    changeAccessCreateTimer,
    changeAccessTimer,
    changeAuth
} from "./store/slices/autentification-slice/authorization-slice";
import {updateTimerAT} from "./updAccessToken";

function App() {
    const dispatch = Dispatch()
    const auth: boolean = Selector(state => state.authorization.auth)
    const {timer,createTimer} = Selector(state => state.authorization)
    const c = Selector(state => state.tasks.img)
    const coin = Selector(state => state.tasks.countTasks)
    useEffect(()=>{
        setInterval(()=>{
            if(!localStorage.getItem('access_token')){
                dispatch(changeAuth(false))
            }
            else{
                dispatch(changeAuth(true))
            }
            const timer = localStorage.getItem('time')
            const createTimer = localStorage.getItem('create_access_date')
            if(timer && createTimer){
                dispatch(changeAccessTimer(+timer))
                dispatch(changeAccessCreateTimer(+createTimer))
            }else{
                dispatch(changeAccessTimer(0))
                dispatch(changeAccessCreateTimer(0))
            }
        },500)
    })
    useEffect(() => {
        updateTimerAT(timer,createTimer,dispatch)
    },[createTimer])

    let color: string = ""
    if(c === 1){
        color = "none"
    }
    if(c === 2 && coin >= 5){
        color = `url("https://sun9-68.userapi.com/s/v1/if2/OU7j3yeGrFcoV0yFyHd0Z3FYPEoYfw9xe2zaj3zMioJSs2zm-zvU5QBg3WoyumqwlgLjmACp17I6aul3v_qQ-l4K.jpg?size=1440x900&quality=95&type=album")`
    }
    if(c === 3 && coin >= 10){
        color = `url("https://sun9-33.userapi.com/s/v1/if2/f_kZ10G5NEIolEj0mMEW9fFfvKf__AgA07HYINqz_q8orp4LxhFL6GghccKhvLEWw6Pz7-stCKbKDiO8IspFXaZe.jpg?size=1440x900&quality=95&type=album")`
    }
    if(c === 4 && coin >= 15){
        color = `url("https://sun9-14.userapi.com/s/v1/if2/WTWRWXksVjAHt82ax2YBa2s6UR30DjM8Ynq_ZnU7rgPSR7hen9q-h0nw4CN7qx4S9HJnLtmV6M0lXmzdoO7XSAIg.jpg?size=1440x900&quality=95&type=album")`
    }

  return (
    <div className="App">
      <div className={"content"} style={{
          backgroundImage: color
      }}>
            <Routes>
                <Route path = '/' element={auth? <TaskPage/> :<AuthContainer/>}/>
                <Route path = '/tasks' element={auth? <TaskPage/> : <Navigate to='/'/>}/>
            </Routes>
      </div>
    </div>
  );
}

export default App;
