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