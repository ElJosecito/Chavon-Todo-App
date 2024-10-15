import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

instance.interceptors.request.use((config) => {

    return config;
});


export default instance;