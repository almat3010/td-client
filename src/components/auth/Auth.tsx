import React from 'react';
import styles from './Auth.module.scss'
import Form from "../form/Form";
import { typeFormAuth} from "../../store/slices/autentification-slice/types";

interface IProps{
    typeForm: typeFormAuth,
    login: string,
    password: string,
    error: string
}

const Auth: React.FC<IProps> = ({typeForm, login, password, error}) => {
    return(
        <div className={styles.login}>
            <Form typeForm={typeForm} login={login} password={password} error={error}/>
        </div>
    )
}
export default Auth