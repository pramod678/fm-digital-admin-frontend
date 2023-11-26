import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const ReleseInfoGetOneApi = (id: any, setReleseInfoGetOne:any) =>
    useQuery(
        [`releseInfoGetOne`],
        async () => await api.get(`createRelease/releseInfoGetOne/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                console.log(res.data.data)
                setReleseInfoGetOne([res.data.data])
            },
        }
    );

export const GetAllReleseInfoApi = (id: any, setReleseInfoGetOne: any) =>
    useQuery(
        [`releseInfoGetOne`],
        async () => await api.get(`tools/releseInfoGetAll/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                console.log(res.data, "jshs")
                setReleseInfoGetOne(res.data.data)
            },
        }
    );

export const ProfileLinkinAdudiogGetApi = (userId: any, releaseId: any) =>
    useQuery(
        [`ProfileLinkinAdudiogGet`, userId, releaseId],
        async () => await api.get(`tools/profileLinkinAdudiogGet/users_id/${userId}/releseInfo_id/${releaseId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData:true,
            enabled: userId && releaseId ? true : false,
            onSuccess: (res) => {
                // console.log(res.data)
            },
        }
    );

export const YoutubeClaimsGetAllApi = (id: any) =>
    useQuery(
        [`youtubeClaimsGetAll`],
        async () => await api.get(`tools/youtubeClaimsGetAll/${id}`),
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

export const YoutubeClaimsPostApi = (reset: any, setIsOpen:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("tools/youtubeClaimsPost", data), {
        onSuccess: (res) => {
            cogoToast.success("UGC Claim Created");
            setIsOpen(false)
            queryClient.refetchQueries([`youtubeClaimsGetAll`]);
            reset()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}