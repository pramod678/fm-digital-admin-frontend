import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const GetSingleUserDataApi = (id: any) =>
    useQuery(
        [`GetSingleUserData`],
        async () => await api.get(`user/getOneUser/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            enabled: id ? true : false,
            refetchOnWindowFocus: false,
        }
    );

export const GetAllUsersDataApi = () =>
    useQuery(
        [`GetSingleUserData`],
        async () => await api.get(`admin/get-all-user`),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const GetAllUsersWithFiltersDataApi = (userId: string) =>
    useQuery(
        [`GetAllUsersWithFilters`, userId],
        async () => await api.get(`admin/manage-users-get-all?user_id=${userId}`),
        {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );



export const UpdateUserDataApi = ({ setReadMode, refetch, id, setIsEditing }: { setReadMode: any, refetch?: any, id?: any, setIsEditing?: any }) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`user/userUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("User Details Updated");
            refetch()
            setReadMode(true)
            setIsEditing(false)
            queryClient.refetchQueries([`GetSingleUserData`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const DeleteUserDataApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.delete(`admin/delete-user/${data}`), {
        onSuccess: (res) => {
            cogoToast.success("User deleted");
            queryClient.refetchQueries([`GetAllUsersWithFilters`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}