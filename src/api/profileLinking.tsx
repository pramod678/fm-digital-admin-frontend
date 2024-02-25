

import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const ProfileLinkingGetAllApi = (id: any) =>
    useQuery(
        [`profileLinkingGetAll`],
        async () => await api.get(`tools/profileLinkingGetAll/${id}`),
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
        async () => await api.get(`admin/profile-linking-get-all?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const ProfileLinkingPostApi = (reset: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("tools/profileLinkingPost", data), {
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
    return useMutation((data: any) => api.put("admin/profile-linking-update", data), {
        onSuccess: (res) => {
            cogoToast.success("Profile Linking updated");
            queryClient.refetchQueries([`GetAllAdminProfileLinking`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}