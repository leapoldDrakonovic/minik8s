
export const API_PATH = {
    PODS: {
        GET: "/pods/list",
        CREATE: "/pods/create",
        GET_BY_ID: (id: string) => `/pods/${id}`,
        DELETE: (id: string) => `/pods/delete/${id}`
    },
    NODES: {
        GET: "/node/list"
    },
    USER: {
        GET: "/user/me",
        LOGIN: "/user/login",
        LOGOUT: "/user/logout",
        REGISTER: "/user/register"
    }
}