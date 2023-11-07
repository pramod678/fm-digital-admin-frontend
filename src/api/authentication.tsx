import cogoToast from "cogo-toast";
import { useMutation } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";


export const LoginWithMailApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation((data) => api.post("/user/login", data), {
        onSuccess: (res) => {
            cogoToast.success("Login successfully");
            window.localStorage.setItem("token", res.data);
            window.localStorage.setItem("loggedIn", "true");
            navigate('/');
            reset()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const RegisterWithMailApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation((data) => api.post("/user/register", data), {
        onSuccess: (res) => {
            cogoToast.success("Registration successfully");
            navigate('/sign-in');
            reset()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}
