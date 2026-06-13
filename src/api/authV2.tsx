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
        onSuccess: (res, variables) => {
            console.log("Login API Success Response:", res);
            console.log("Response data:", res?.data);

            // Check is_login FIRST — backend may return HTTP 200 with is_login: false
            if (res?.data?.is_login === false) {
                cogoToast.info("Please reset your password to continue");
                navigate('/forgot-password', {
                    state: {
                        email: variables.email,
                        fromLoginRedirect: true,
                    },
                });
                reset();
                return;
            }

            if (res?.data?.status === "error") {
                cogoToast.error(res?.data?.error || res?.data?.message);
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
        onError: (error: any, variables) => {
            console.log("Login API Error Response:", error);
            console.log("Error response data:", error?.response?.data);
            const resData = error?.response?.data;

            // Also check is_login here — backend may return non-2xx with is_login: false
            if (resData?.is_login === false) {
                cogoToast.info("Please reset your password to continue");
                navigate('/forgot-password', {
                    state: {
                        email: variables.email,
                        fromLoginRedirect: true,
                    },
                });
                reset();
                return;
            }

            cogoToast.error(resData?.message || resData?.error || "Login failed");
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
            // Body shape matches the FM-Digital Postman collection: backend
            // expects both `email` and `phoneNumber`. The form only collects
            // email, so phoneNumber is sent as an empty string.
            const res = await api.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
                email: payload.email,
                phoneNumber: "",
            });
            return res;
        },
        onSuccess: (res, variables) => {
            if (res?.data?.error) {
                cogoToast.error(res?.data?.error || 'Failed to send OTP');
            } else {
                cogoToast.success("OTP sent to your email successfully");
                reset();
                navigate('/verify-otp', { state: { email: variables.email } });
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send OTP';
            cogoToast.error(errorMessage);
        }
    });
};

type VerifyOtpPayload = {
    email: string;
    otp: string;
};

export const VerifyOtpApi = (navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (payload: VerifyOtpPayload) => {
            const res = await api.post(ENDPOINTS.AUTH.VERIFY_OTP, payload);
            return res;
        },
        onSuccess: (res, variables) => {
            if (res?.data?.error) {
                cogoToast.error(res?.data?.error || 'Invalid OTP');
            } else {
                cogoToast.success("OTP verified successfully");
                navigate('/reset-password', { state: { email: variables.email } });
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Invalid OTP';
            cogoToast.error(errorMessage);
        }
    });
};

type ResetPasswordPayload = {
    email: string;
    password: string;
};

export const ResetPasswordApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (payload: ResetPasswordPayload) => {
            const res = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, payload);
            return res;
        },
        onSuccess: (res) => {
            if (res?.data?.error) {
                cogoToast.error(res?.data?.error || 'Failed to reset password');
            } else {
                cogoToast.success("Password reset successfully");
                reset();
                navigate('/sign-in');
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to reset password';
            cogoToast.error(errorMessage);
        }
    });
};
