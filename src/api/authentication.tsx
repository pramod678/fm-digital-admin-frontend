import cogoToast from "@successtar/cogo-toast";
import { useMutation, useQuery } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";

type LoginPayload = {
    email: string;
    password: string;
    checkbox: boolean;
  };
  export const LoginWithMailApi = (reset: any, navigate: any, setToken: any, setUserType: any) => {
    console.log("Login with mail")
    return useMutation({
      mutationFn: async (payload: LoginPayload) => {
        // MOCK LOGIN for Development
        if (payload.email === "admin@local.com" && payload.password === "pass123") {
            console.log("⚡ Executing Magic Login");
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

        console.log("Attempting login to: https://api.fmdigitalofficial.com/api/v1/user/login");
        const res = await api.post("https://api.fmdigitalofficial.com/api/v1/user/login", payload);
        return res;
      },
onSuccess: (res) => {
            if (res?.data?.status === "error") {
                cogoToast.error(res?.data?.error);
            } else {
                // Handle both string tokens and object tokens
                const tokenData = typeof res.data.data === 'string' ? res.data.data : res.data.data?.token;
                setToken(tokenData);
                localStorage.setItem("token", tokenData);
                
                // Set user type from response
                const userType = res.data?.data?.userType || 'user';
                setUserType(userType);
                localStorage.setItem("userType", userType);
                
                navigate('/');
                cogoToast.success("Login successfully");
                reset()
            }
        },
      onError: (res: any) => {
        cogoToast.error(res?.data?.error);
    }
    });
  };

export const RegisterWithMailApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (data) => {
            console.log('🚀 Starting registration with data:', data);
            try {
                const res = await api.post("https://api.fmdigitalofficial.com/api/v1/user/register", data);
                console.log('✅ Registration API call successful:', res);
                return res;
            } catch (error) {
                console.error('❌ Registration API call failed:', error);
                throw error;
            }
        },
        onSuccess: (res) => {
            console.log('🎉 Registration onSuccess called with response:', res);
            console.log('Response data:', res?.data);
            console.log('Response status:', res?.status);
            console.log('Response headers:', res?.headers);
            
            if (res?.data?.error) {
                console.log('⚠️ Registration failed - API returned an error');
                console.log('Error message:', res?.data?.error);
                cogoToast.error(res?.data?.error || 'Registration failed');
            } else {
                console.log('✅ Registration successful!');
                cogoToast.success("Registration successfully");
                
                // Store token if provided in the response (check multiple possible paths)
                let tokenStored = false;
                if (res?.data?.token) {
                    console.log('💾 Storing token from res.data.token:', res.data.token);
                    localStorage.setItem("token", res.data.token);
                    tokenStored = true;
                } else if (res?.data?.data?.token) {
                    console.log('💾 Storing token from res.data.data.token:', res.data.data.token);
                    localStorage.setItem("token", res.data.data.token);
                    tokenStored = true;
                } else if (res?.data?.data && typeof res.data.data === 'string') {
                    console.log('💾 Storing token from res.data.data (string):', res.data.data);
                    localStorage.setItem("token", res.data.data);
                    tokenStored = true;
                } else {
                    console.log('⚠️ No token found in response.');
                }
                
                console.log('Token stored:', tokenStored);

                if (tokenStored) {
                    console.log('Current localStorage token:', localStorage.getItem('token'));
                    // Add a small delay to ensure cookies/tokens are set
                    console.log('🔄 Navigating to dashboard in 100ms...');
                    setTimeout(() => {
                        console.log('➡️ Navigating to dashboard now');
                        navigate('/');
                    }, 100);
                } else {
                    console.log('🤔 No token was returned from registration. Navigating to sign-in.');
                    navigate('/sign-in');
                }
            }
            reset();
        },
        onError: (error: any) => {
            console.error('❌ Registration onError called:', error);
            console.error('Error response:', error?.response);
            console.error('Error data:', error?.response?.data);
            console.error('Error status:', error?.response?.status);
            console.error('Error message:', error?.message);
            
            const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed';
            console.log('Showing error message:', errorMessage);
            cogoToast.error(errorMessage);
            
            // On error, do not redirect. Stay on the sign-up page.
            console.log('➡️ Staying on sign-up page due to error');
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

// Forgot Password API - Stubbed for frontend development
// TODO: Update endpoint when backend is ready
type ForgotPasswordPayload = {
    email: string;
};

export const ForgotPasswordApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (payload: ForgotPasswordPayload) => {
            // TODO: Replace with actual endpoint when backend is ready
            const res = await api.post("/user/forgot-password", payload);
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