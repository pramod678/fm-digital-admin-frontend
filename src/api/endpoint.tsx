// ─── endpoint.tsx ────────────────────────────────────────────
// Central file for all backend endpoint URLs and the React Query
// hooks that call them. All new features should add their URLs
// and hooks to this file.
//
// Structure:
//   ENDPOINTS.AUTH.*     → auth endpoints (login, register, ...)
//   ENDPOINTS.USER.*     → user endpoints (future)
//   ENDPOINTS.CATALOGS.* → catalog endpoints (future)
//   ...
//
// Components should import the hooks from this file:
//   import { LoginWithMailApi } from "../../api/endpoint";
// ─────────────────────────────────────────────────────────────

import cogoToast from "@successtar/cogo-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import { NavigateFunction } from "react-router-dom";

// ─── ENDPOINTS ───────────────────────────────────────────────
// All backend URLs live here, grouped by feature area. If the
// backend renames an endpoint, this block is the only place
// that needs updating. Feature groups (AUTH, USER, ...) exist
// so the file scales cleanly as more APIs are migrated in.
const ENDPOINTS = {
    AUTH: {
        LOGIN: "/user/login",
        REGISTER: "/user/register",
        USER_DATA: "/user/userData",
        FORGOT_PASSWORD: "/user/forgot-password",
    },
    PLATFORM: {
        POST: "createRelease/platformPost",
        UPDATE: "createRelease/platformUpdate",    // + /:id
    },
    PROFILE_LINKING: {
        GET_ALL: "tools/profileLinkingGetAll",           // + /:id
        POST: "tools/profileLinkingPost",
        ADMIN_GET_ALL: "admin/profile-linking-get-all",  // ?user_id=&status=
        ADMIN_UPDATE: "admin/profile-linking-update",
    },
    TICKET: {
        POST: "createRelease/ticketPost",
        GET_ALL: "createRelease/ticketgetAll/users_id",  // + /:id
        ADMIN_GET_ALL: "admin/ticket-get-all",           // ?user_id=&status=
        ADMIN_UPDATE: "admin/ticket-update",
    },
    // Future feature groups will be added here as other APIs migrate in:
    // USER: { ... },
    // CATALOGS: { ... },
    // FINANCIAL: { ... },
} as const;

// ─── TYPES ───────────────────────────────────────────────────
type LoginPayload = {
    email: string;
    password: string;
    checkbox: boolean;
};

type ForgotPasswordPayload = {
    email: string;
};

// ─── AUTH HOOKS ──────────────────────────────────────────────

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

            const res = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
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
                const res = await api.post(ENDPOINTS.AUTH.REGISTER, data);
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
        async () => await api.get(`${ENDPOINTS.AUTH.USER_DATA}?token=${token}`),
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
        async () => await api.get(`${ENDPOINTS.AUTH.USER_DATA}?token=${token}`),
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
export const ForgotPasswordApi = (reset: any, navigate: NavigateFunction) => {
    return useMutation({
        mutationFn: async (payload: ForgotPasswordPayload) => {
            // TODO: Replace with actual endpoint when backend is ready
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

// ─── PLATFORM HOOKS ──────────────────────────────────────────

export const PlatformPostApi = (navigate: NavigateFunction) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.post(ENDPOINTS.PLATFORM.POST, data), {
        onSuccess: (res) => {
            cogoToast.success("platform Added");
            navigate('/Submission');
        },
        onError: ({ response }: { response: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const UpdatePlatformApi = ({ navigate, id, releaseId }:{navigate: NavigateFunction, id:any, releaseId:any}) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(`${ENDPOINTS.PLATFORM.UPDATE}/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("platform updated");
            navigate(`/Submission/${releaseId}`);
        },
        onError: ({ response }: { response: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

// ─── PROFILE LINKING HOOKS ───────────────────────────────────

export const ProfileLinkingGetAllApi = (id: any) =>
    useQuery(
        [`profileLinkingGetAll`],
        async () => await api.get(`${ENDPOINTS.PROFILE_LINKING.GET_ALL}/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                console.log(res.data)
            },
        }
    );

export const GetAllAdminProfileLinkingApi = (userId: string, statusId: string) =>
    useQuery(
        [`GetAllAdminProfileLinking`, userId, statusId],
        async () => await api.get(`${ENDPOINTS.PROFILE_LINKING.ADMIN_GET_ALL}?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const ProfileLinkingPostApi = (reset: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post(ENDPOINTS.PROFILE_LINKING.POST, data), {
        onSuccess: (res) => {
            cogoToast.success("Profile Linking Created");
            setIsOpen(false)
            queryClient.refetchQueries([`profileLinkingGetAll`]);
            reset()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const UpdateProfileLinkingPostApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(ENDPOINTS.PROFILE_LINKING.ADMIN_UPDATE, data), {
        onSuccess: (res) => {
            cogoToast.success("Profile Linking updated");
            queryClient.refetchQueries([`GetAllAdminProfileLinking`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

// ─── TICKET HOOKS ─────────────────────────────────────────────

export const TicketPostApi = (setIsOpen: any, reset: any, setFile: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post(ENDPOINTS.TICKET.POST, data), {
        onSuccess: (res) => {
            cogoToast.success("Ticket Added");
            queryClient.refetchQueries([` GetAllTicket`]);
            reset()
            setFile(null)
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAllTicketApi = (userId: any) =>
    useQuery(
        [` GetAllTicket`, userId],
        async () => await api.get(`${ENDPOINTS.TICKET.GET_ALL}/${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const GetAllAdminTicketApi = (userId:string, statusId:string) =>
    useQuery(
        [`GetAllAdminTicket`, userId, statusId],
        async () => await api.get(`${ENDPOINTS.TICKET.ADMIN_GET_ALL}?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const UpdateTicketAdminApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(ENDPOINTS.TICKET.ADMIN_UPDATE, data), {
        onSuccess: (res) => {
            cogoToast.success("ticket updated");
            queryClient.refetchQueries([`GetAllAdminTicket`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}
