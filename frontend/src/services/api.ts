import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:10000", 
    withCredentials: true, 
});

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log("🌐 [API REQUEST]", {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            headers: config.headers,
            data: config.data,
            withCredentials: config.withCredentials
        });
        return config;
    },
    (error) => {
        console.error("❌ [API REQUEST ERROR]", error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log("✅ [API RESPONSE]", {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error("❌ [API RESPONSE ERROR]", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message
        });
        return Promise.reject(error);
    }
);

export default api;