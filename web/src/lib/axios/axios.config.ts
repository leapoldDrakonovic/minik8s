import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:8080" // make .env
})

api.interceptors.response.use((res) => {
    if (res.status != 200) {
        console.log("Inter works")
    }
    return res
})