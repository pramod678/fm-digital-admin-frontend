import cogoToast from "@successtar/cogo-toast";
import { useMutation } from "react-query";
import api from "../lib/apiAuth";
import { NavigateFunction } from "react-router-dom";
import { ENDPOINTS } from "./endpoint";

type LoginPayload = {
    email: string;
    password: string;
    checkbox: boolean;
};

export const LoginWithMailApi = (reset: any, navigate: any, setToken: any) => {
    return useMutation({
        mutationFn: async (payload: LoginPayload) => {
            // MOCK LOGIN for Development
            if (payload.email === "admin@local.com" && payload.password === "pass123") {
                return {
                    data: {
                        status: "success",
                        data: {
                            token: "mock-token-12345",
                            userType: "admin"
                        },
                        message: "Login successfully"
                    }
                };
            }

            const res = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
            return res;
        },
        onSuccess: (res) => {
            console.log("Login API Success Response:", res);
            if (res?.data?.status === "error") {
                cogoToast.error(res?.data?.error);
            } else {
                // Handle both string tokens and object tokens
                const tokenData = typeof res.data.data === 'string' ? res.data.data : res.data.data?.token;
                setToken(tokenData);
                localStorage.setItem("token", tokenData);

                navigate('/');
                cogoToast.success("Login successfully");
                reset();
            }
        },
        onError: (res: any) => {
            console.log("Login API Error Response:", res);
            cogoToast.error(res?.data?.error);
        }
    });
};

export const RegisterWithMailApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (data) => {
            try {
                const res = await api.post(ENDPOINTS.AUTH.REGISTER, data);
                return res;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (res) => {
            if (res?.data?.error) {
                cogoToast.error(res?.data?.error || 'Registration failed');
            } else {
                cogoToast.success("Registration successfully");

                // Store token if provided in the response (check multiple possible paths)
                let tokenStored = false;
                if (res?.data?.token) {
                    localStorage.setItem("token", res.data.token);
                    tokenStored = true;
                } else if (res?.data?.data?.token) {
                    localStorage.setItem("token", res.data.data.token);
                    tokenStored = true;
                } else if (res?.data?.data && typeof res.data.data === 'string') {
                    localStorage.setItem("token", res.data.data);
                    tokenStored = true;
                }

                if (tokenStored) {
                    setTimeout(() => {
                        navigate('/');
                    }, 100);
                } else {
                    navigate('/sign-in');
                }
            }
            reset();
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed';
            cogoToast.error(errorMessage);
        }
    });
};

// Forgot Password API - Stubbed for frontend development
// TODO: Update endpoint when backend is ready
type ForgotPasswordPayload = {
    email: string;
};

export const ForgotPasswordApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (payload: ForgotPasswordPayload) => {
            const res = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, payload);
            return res;
        },
        onSuccess: (res) => {
            if (res?.data?.error) {
                cogoToast.error(res?.data?.error || 'Failed to send OTP');
            } else {
                cogoToast.success("OTP sent to your email successfully");
                reset();
                // TODO: Navigate to OTP verification page when implemented
                // navigate('/verify-otp');
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send OTP';
            cogoToast.error(errorMessage);
        }
    });
};
