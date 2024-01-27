import cogoToast from "@successtar/cogo-toast";
import { useMutation } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";


export const LoginWithMailApi = (reset: any, navigate: NavigateFunction, setToken:any) => {
    return useMutation((data) => api.post("/user/login", data), {
        onSuccess: (res) => {
            if (res?.data?.status === "error"){
                cogoToast.success(res?.data?.error);
            }else{
                cogoToast.success("Login successfully");
                setToken(res.data.data)
                localStorage.setItem("token", res.data?.data);
                if(localStorage.getItem("token")){
                    console.log("token saved")
                    navigate('/');
                } 
                reset()
            }    
        },
        onError: (res:any) => {
            cogoToast.error(res?.data?.error);
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

export const GetUserDataApi = (setAdmin: any, setUserData: any, navigate: NavigateFunction, setUserType:any) => {
    return useMutation((data: any) => api.post("/user/userData", data), {
        onSuccess: (res) => {
            setUserType(res.data?.data.userType)
            setUserData(res.data.data);
            if (res.data?.data === "token expired") {
                cogoToast.success("Token Expired");
                navigate('/sign-in');
            }
        },
        retry:1,
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}
