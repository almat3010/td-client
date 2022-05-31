import React from 'react';
import styles from './MainPage.module.scss'
import Title from "../../components/title/Title";

const MainPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}> <Title/> </div>
            <div className={styles.wrapper}>
                <p className={styles.text}> Войди или зарегестрируйся</p>
            </div>
        </div>
    );
};

export default MainPage;