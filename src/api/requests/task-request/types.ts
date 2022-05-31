export interface IUTaskB{
    id: number,
    done:boolean,
}
export interface IATaskB{
    title:string,
    done:boolean,
}

export interface ITaskReq{
    getTasks():Promise<any>
    addTask(body:IATaskB):Promise<any>
    updateTask(body:IUTaskB):Promise<any>
    deleteTask(q?: number):Promise<any>
}