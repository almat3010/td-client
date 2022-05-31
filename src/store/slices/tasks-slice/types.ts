export interface ITask{
    id: number,
    title: string,
    done: boolean,
}

export interface ITaskState{
    titleInput: string,
    tasks: ITask[],
    isRequestTask: boolean,
    img: number,
    countTasks: number
}