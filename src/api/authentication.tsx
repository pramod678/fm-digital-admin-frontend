import cogoToast from "@successtar/cogo-toast";
import { useMutation, useQuery } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";


export const LoginWithMailApi = (reset: any, navigate: NavigateFunction, setToken: any) => {
    return useMutation((data) => api.post("/user/login", data), {
        onSuccess: (res) => {
            if (res?.data?.status === "error") {
                cogoToast.success(res?.data?.error);
            } else {
                cogoToast.success("Login successfully");
                setToken(res.data.data)
                localStorage.setItem("token", res.data?.data);
                navigate('/');
                reset()
            }
        },
        onError: (res: any) => {
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



export const GetUserDataApi = (setUserData: any, navigate: NavigateFunction, setUserType: any, token: string) =>
    useQuery(
        [`GetUserData`, token],
        async () => await api.get(`/user/userData?token=${token}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: token?.length > 0 ? true : false,
            onSuccess: (res) => {
                setUserType(res.data?.data.userType)
                setUserData(res.data.data);
                if (res.data?.data === "token expired") {
                    cogoToast.success("Token Expired");
                    navigate('/sign-in');
                }
            },
            retry: 1,
            onError: ({ response }) => {
                cogoToast.error(response?.data?.message);
            }
        }
    );


export const GetTokenValidateApi = (navigate: NavigateFunction, setIsVerified: any, token: string) =>
    useQuery(
        [`GetTokenValidate`, token],
        async () => await api.get(`/user/userData?token=${token}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: token?.length > 0 ? true : false,
            onSuccess: (res) => {
                if (res.data?.data === "token expired") {
                    cogoToast.success("Token Expired");
                    navigate('/sign-in');
                    setIsVerified(false)
                }
            },
            retry: 1,
            onError: ({ response }) => {
                cogoToast.error(response?.data?.message);
            }
        }
    );