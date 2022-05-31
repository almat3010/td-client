import styles from "./changer.module.scss"
import {AppDispatch, Selector} from "../../store/store";
import {iChange} from "../tasks/task/task-fun";
import React from "react";

interface IProps{
    img: number,
    dispatch: AppDispatch,
    onClick: iChange,
    text: string
}
const Changer :React.FC<IProps> = ({img,dispatch,onClick,text}) => {
    return (
            <button className={styles.btn1} onClick={() => onClick(img, dispatch)}>{text}</button>
    );
};
export default Changer;