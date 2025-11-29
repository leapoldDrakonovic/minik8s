import { API_PATH } from "@/shared/config";
import { api } from "@/lib/axios/axios.config";
import type { IDashboardData, IPodData } from "./type";



export class DashboardServive {
    static async GetDashboardData(): Promise<IDashboardData | undefined> {
        return api.get<IDashboardData>("/dashboard").then(res => res.data)
    }

    static async GetNodesData(): Promise<any | undefined> {
        return api.get(API_PATH.NODES.GET).then(res => res.data)
    }

    static async GetPodsData(): Promise<IPodData[] | undefined> {
        return api.get(API_PATH.PODS.GET).then(res => res.data)
    }

    static async GetPodById(id: string): Promise<IPodData | undefined> {
        return api.get(API_PATH.PODS.GET_BY_ID(id)).then(res => res.data)
    }

    static async CreatePod(data: any): Promise<IPodData | undefined> {
        return api.post(API_PATH.PODS.CREATE, data).then(res => res.data)
    }

    static async DeletePod(id: string): Promise<string | undefined> {
        return api.delete(API_PATH.PODS.DELETE(id)).then(res => res.data)
    }
}