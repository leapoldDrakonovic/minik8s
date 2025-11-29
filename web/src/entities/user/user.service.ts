import { api } from "@/lib/axios/axios.config";
import type { IUserData } from "./type";


export class UserService {
    static async GetUser(): Promise<IUserData | undefined>{
        return api.get<IUserData>("/user/me").then(res => res.data)
    }
}