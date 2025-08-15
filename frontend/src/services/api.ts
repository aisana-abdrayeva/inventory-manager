import axios from "axios";

const api = axios.create({
    baseURL: "https://inventory-manager-backend-production-7a87.up.railway.app", 
    withCredentials: false, 
});

export default api;