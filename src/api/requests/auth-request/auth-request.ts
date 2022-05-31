import {IAuthReq, IRTokenB, IUserAuthB} from "./types";
import {axiosConfig} from "../../axios.config";


class AuthRequest implements IAuthReq{
    public auth(body: IUserAuthB): Promise<any> {
        return axiosConfig.post('auth/signIn', body)
    }

    public refreshToken(body: IRTokenB): Promise<any> {
        return axiosConfig.post('refresh',body)
    }

    public reg(body: IUserAuthB): Promise<any> {
        return axiosConfig.post('auth/signUp',body)
    }
}
export default new AuthRequest()