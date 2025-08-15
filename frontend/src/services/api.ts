import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true, 
});
//inventory-manager-backend-production-7a87.up.railway.app
export default api;