import {formAuth, typeFormAuth} from "../../store/slices/autentification-slice/types";
import React from 'react';
import {AppDispatch} from "../../store/store";
import {
    asyncSignIn,
    asyncSignUp,
    exit,
    formChanger
} from "../../store/slices/autentification-slice/authorization-slice";

export const onSubmit = (type: typeFormAuth, dispatch: AppDispatch, e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type === formAuth.SIGN_UP){
        dispatch(asyncSignUp())
        dispatch(formChanger(formAuth.EXIT))
    }else if (type === formAuth.SIGN_IN){
        dispatch(asyncSignIn())
        dispatch(formChanger(formAuth.EXIT ))
    }
    else if (type === formAuth.EXIT){
        dispatch(exit())
        dispatch(formChanger(formAuth.SIGN_IN ))
    }
}
export const onChangeForm = (type: typeFormAuth, dispatch: AppDispatch, e: React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    dispatch(formChanger(type))
}