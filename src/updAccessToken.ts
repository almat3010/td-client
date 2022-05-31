import {AppDispatch} from "./store/store";
import {asyncRefreshAuth} from "./store/slices/autentification-slice/authorization-slice";

export const updateTimerAT = (
    timeAT: number,
    createDAT: number,
    dispatch:AppDispatch
):void=> {
    if(!timeAT||!createDAT){
        return
    }
    let timer:number=0
    const intervalId=setInterval(()=>{
        const now:number=new Date().getTime()
        timer=now-createDAT
        if(timer>=timeAT-1000){
            dispatch(asyncRefreshAuth())
            clearInterval(intervalId)
        }
    },1000)
}