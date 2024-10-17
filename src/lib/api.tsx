import axios from "axios";

const token = localStorage.getItem("token");
const api = axios.create({
<<<<<<< HEAD
    baseURL: "https://api.fmdigitalofficial.com/api/v1" ,
    // baseURL: "https://fmdigitalofficial.in/api/v1" ,
=======
    baseURL: "https://api.fmdigitalofficial.com/api/v1",
>>>>>>> 29d79848328f06c1959404d9e3020481403d71fa
    headers: {
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Origin": "*",
    }
});

const setAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// Interceptor to call setAuthToken before each request
api.interceptors.request.use(
    (config) => {
        setAuthToken();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;