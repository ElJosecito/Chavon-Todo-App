import axios from "axios";
import { useAuthStore } from "../store/auth";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

instance.interceptors.request.use((config) => {
    const { token } = useAuthStore.getState();
    config.headers = {
        "auth-token": `${token}`,
    }
    return config;
});


export default instance;