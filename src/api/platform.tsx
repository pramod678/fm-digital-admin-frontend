import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";
import { NavigateFunction } from "react-router-dom";


export const PlatformPostApi = (navigate: NavigateFunction) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.post("createRelease/platformPost", data), {
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
    return useMutation((data: any) => api.put(`createRelease/platformUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("platform updated");
            navigate(`/Submission/${releaseId}`);
        },
        onError: ({ response }: { response: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}