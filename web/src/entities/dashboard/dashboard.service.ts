import { api } from "../../lib/axios/axios.config";
import type { IDashboardData } from "./type";



export class DashboardServive {
    static async GetDashboardData(): Promise<IDashboardData | undefined> {
        return api.get<IDashboardData>("/pods/list").then(res => res.data)
    }
}