import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const FinancialPostApi = (setIsOpen: any, reset: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("/admin/admin-finacial-create", data), {
        onSuccess: (res) => {
            cogoToast.success("Financial Request Added");
            queryClient.refetchQueries([`GetAdminAllFinancial`]);
            reset()
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UserFinancialPostApi = ({ handleClose, handleReset, handleAmount }: { handleClose?: any, handleReset?: any, handleAmount?: any }) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.post("/admin/user-finacial-create", data), {
        onSuccess: (res) => {
            cogoToast.success("Financial Request Added");
            if (handleAmount && typeof handleAmount === 'function'){
                handleAmount()
            }
            console.log("ssss")
            queryClient.refetchQueries([`GetAdminAllUserFinancial`]);
            queryClient.refetchQueries([`GetAdminAllFinancial`]);
            queryClient.refetchQueries([`GetUserAllUserFinancial`]);
            if (handleReset && typeof handleReset === 'function') { // Check if handleReset is a function before calling it
                handleReset();
            }
            if (handleClose && typeof handleClose === 'function'){
                handleClose()
            }
        },
        onError: ({ response }) => {
            console.log("ssss")
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAdminAllUserFinancialApi = (adminId: string, statusId?: number) =>
    useQuery(
        [`GetAdminAllUserFinancial`, adminId, statusId],
        async () => await api.get(`admin/user-finacial-get-all`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );


export const GetAdminAllUserFinancialHistoryApi = (adminId: string, userId?:string) =>
    useQuery(
        [`GetAdminAllUserFinancialHistory`, adminId, userId],
        async () => await api.get(`admin/finacial-history-get-all?user_id=${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

export const GetUserAllUserFinancialApi = (userId: string, statusId?: string) =>
    useQuery(
        [`GetUserAllUserFinancial`, userId, statusId],
        async () => await api.get(`admin/user-finacial-get-all?user_id=${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );



export const GetAdminAllFinancialApi = (userId: string, statusId?: string) =>
    useQuery(
        [`GetAdminAllFinancial`, userId, statusId],
        async () => await api.get(`admin/admin-finacial-get-all`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );


export const UpdateUserFundApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(`admin/user-finacial-update/${data?.id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated");
            queryClient.refetchQueries([`GetAdminAllUserFinancial`]);
            queryClient.refetchQueries([`GetAdminAllUserFinancialHistory`]);
            queryClient.refetchQueries([`GetAdminAllFinancial`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}