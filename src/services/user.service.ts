import axiosConfig from "../config/axios.config";
import type { IPaginationParams } from "../config/constants";

class UserService{
    async getAllUsers(params: IPaginationParams) {
        return await axiosConfig.get("/v1/user", {
            params: params
        })
    }
}
export default new UserService(); 