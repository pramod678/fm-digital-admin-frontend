import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL || "https://api.fmdigitalofficial.com/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hadToken = !!localStorage.getItem("token");
            if (hadToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("auth-storage");
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
