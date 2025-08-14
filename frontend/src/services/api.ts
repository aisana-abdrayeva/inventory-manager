import axios from "axios";

const api = axios.create({
    baseURL: "inventory-manager-backend-production-7a87.up.railway.app/api",
    withCredentials: true, 
});
//inventory-manager-backend-production-7a87.up.railway.app
export default api;