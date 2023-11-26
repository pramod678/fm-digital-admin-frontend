import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const LabelPostApi = (setIsOpen: any, reset:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/labelPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Label Added");
            queryClient.refetchQueries([`GetAllLabels`]);
            reset()
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAllLabelsApi = () =>
    useQuery(
        [`GetAllLabels`],
        async () => await api.get(`createRelease/labelgetAll`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

