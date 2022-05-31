export enum formAuth{
    SIGN_UP = 'signUp',
    SIGN_IN = 'signIn',
    EXIT = 'exit'
}

export type typeFormAuth = formAuth.SIGN_IN | formAuth.SIGN_UP | formAuth.EXIT

export interface IAutentificationState{
    timer: number,
    createTimer: number,
    auth: boolean
    typeForm: typeFormAuth,
    login: string,
    password: string,
    error: string,
}