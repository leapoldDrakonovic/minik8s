import { api } from "@/lib/axios/axios.config";
import type { IUserData } from "./type";
import { API_PATH } from "@/shared/config";


export class UserService {
    static async GetUser(): Promise<IUserData | undefined>{
        return api.get<IUserData>(API_PATH.USER.GET).then(res => res.data)
    }

    static async LoginUser(): Promise<IUserData | undefined>{
        return api.post<IUserData>(API_PATH.USER.LOGIN).then(res => res.data)
    }

    static async RegisterUser() {
        return api.post<IUserData>(API_PATH.USER.REGISTER).then(res => res.data)
    }

    static async LogoutUser() {
        return api.get(API_PATH.USER.LOGOUT)
    }
}