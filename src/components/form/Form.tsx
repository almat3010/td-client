import React from 'react';
import styles from './Form.module.scss'
import {formAuth, typeFormAuth} from "../../store/slices/autentification-slice/types";
import FormButton from "../form-button/FormButton";
import FormInput from "../form-input/FormInput";
import {onChangeForm, onSubmit} from "../auth/untils";
import {Dispatch, Selector} from "../../store/store";
import {formChanger} from "../../store/slices/autentification-slice/authorization-slice";

interface IProps{
    typeForm: typeFormAuth,
    login: string,
    password: string,
    error: string,
}

const Form : React.FC<IProps>= ({typeForm, login, password, error}) => {
    const auth : boolean = Selector(state => state.authorization.auth)
    const dispatch = Dispatch()
    return  <form className={styles.form}>
                {typeForm===formAuth.EXIT || auth? <FormButton onClick={ e => onSubmit(formAuth.EXIT, dispatch, e) } text='Exit' /> :
                typeForm===formAuth.SIGN_UP?
                    <>
                        <h2 className={styles.title}>Регистрация</h2>
                        <div className={styles.wrapper}>
                        <FormInput value={login} type='text'></FormInput>
                        </div>
                        <div className={styles.wrapper}>
                        <FormInput value={password} type='password'></FormInput>
                        </div>
                        <div className={styles.wrapper}>
                        <FormButton onClick={e => onSubmit(formAuth.SIGN_UP, dispatch, e)} text='Зарегистрироваться'></FormButton>
                        </div>
                        <div className={styles.wrapper}>
                        <button className={styles.buttonSmall} onClick={e=>onChangeForm(formAuth.SIGN_IN, dispatch, e)}>Войти?</button>
                        </div>
                    </>:
                    <>
                        <h2 className={styles.title}>Вход</h2>
                        <div className={styles.wrapper}>
                            <FormInput value={login} type='text'></FormInput>
                        </div>
                        <div className={styles.wrapper}>
                            <FormInput value={password} type='password'></FormInput>
                        </div>
                        <div className={styles.wrapper}>
                            <FormButton onClick={e => onSubmit(formAuth.SIGN_IN, dispatch, e)} text='Войти'></FormButton>
                        </div>
                        <div className={styles.wrapper}>
                            <button className={styles.buttonSmall} onClick={e=>onChangeForm(formAuth.SIGN_UP, dispatch, e)}>Зарегестрироваться?</button>
                        </div>
                    </>
                }
            </form>
}
export default Form