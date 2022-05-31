export interface IUserAuthB{
    login: string,
    password: string,
}
export interface IRTokenB{
    refreshT: string
}
export interface IAuthReq{
    auth(body:IUserAuthB):Promise<any>
    reg(body:IUserAuthB):Promise<any>
    refreshToken(body:IRTokenB):Promise<any>
}