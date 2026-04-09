import axios from "axios";

// STEP 1 + 2: Base URL comes from .env (REACT_APP_API_BASE_URL).
// The fallback URL ensures the app still works if the env var is missing
// (e.g. a fresh clone before someone creates their .env file).
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.fmdigitalofficial.com/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
});

// STEP 4a: REQUEST INTERCEPTOR
// Runs before every outgoing request. Grabs the current token from
// localStorage and attaches it as a Bearer token. Written once — every
// api.get/post/put/delete call in the app uses this automatically.
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

// STEP 4b: RESPONSE INTERCEPTOR
// Runs after every response. If the backend returns 401 (expired or
// invalid token) AND the user actually had a token, we clear the auth
// state and redirect to /sign-in.
//
// The `hadToken` guard is important: without it, a wrong-password login
// attempt (which also returns 401) would wipe the redirect and kick the
// user around their own login page. We only force-logout people who were
// previously logged in.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const hadToken = !!localStorage.getItem("token");
            if (hadToken) {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                // Zustand persist middleware stores the auth store here.
                // Clearing it prevents the store from rehydrating a dead token.
                localStorage.removeItem("auth-storage");
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
