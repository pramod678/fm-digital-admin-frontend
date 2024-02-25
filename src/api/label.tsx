import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const LabelPostApi = (setIsOpen: any, reset: any, setFile:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/labelPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Label Added");
            queryClient.refetchQueries([`GetAllLabels`]);
            reset()
            setFile(null)
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UpdateLabelApi = (id: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/labelUpdate/label_id/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetAllLabels`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAllLabelsApi = (id: any) =>
    useQuery(
        [`GetAllLabels`],
        async () => await api.get(`createRelease/labelgetAll/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false
        }
    );

export const GetAllAdminLabelsApi = (userId: string, statusId:string ) =>
    useQuery(
        [`GetAllAdminLabels`, userId, statusId],
        async () => await api.get(`admin/label-get-all?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );


export const UpdateLabelAdminApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put("admin/label-update", data), {
        onSuccess: (res) => {
            cogoToast.success("label updated");
            queryClient.refetchQueries([`GetAllAdminLabels`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}