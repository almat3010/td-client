import {axiosConfig} from "../../axios.config";
import {IATaskB, ITaskReq, IUTaskB} from "./types";

class TaskRequest implements ITaskReq{

    getTasks(): Promise<any> {
        return axiosConfig.get('/tasks');
    }

    addTask(body: IATaskB): Promise<any> {
        return axiosConfig.post('/tasks', body);
    }

    updateTask(body: IUTaskB): Promise<any> {
        return axiosConfig.put('/tasks', body);
    }

    deleteTask(q?: number): Promise<any> {
        return axiosConfig.delete(`/tasks?id=${q || ''}`);
    }

}
export default new TaskRequest()