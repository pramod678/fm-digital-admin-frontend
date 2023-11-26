import cogoToast from "cogo-toast";
import { useMutation } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";


export const LoginWithMailApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation((data) => api.post("/user/login", data), {
        onSuccess: (res) => {
            cogoToast.success("Login successfully");
            console.log(res.data?.data, "res.data?.data")
            window.localStorage.setItem("token", res.data?.data);
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

export const GetUserDataApi = (setAdmin: any, setUserData: any, navigate: NavigateFunction) => {
    return useMutation((data: any) => api.post("/user/userData", data), {
        onSuccess: (res) => {
            console.log("res", res?.data)
            if (res.data?.data.userType === "Admin") {
                setAdmin(true);
            }
            setUserData(res.data.data);
            if (res.data?.data === "token expired") {
                alert("Token expired login again");
                window.localStorage.clear();
                navigate('/sign-in');
            }
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}
