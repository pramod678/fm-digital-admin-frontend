import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";


export const PlatformPostApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data:any) => api.post("createRelease/platformPost", data), {
        onSuccess: (res) => {
            cogoToast.success("platform Added");
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}