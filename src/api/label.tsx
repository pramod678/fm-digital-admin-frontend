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

