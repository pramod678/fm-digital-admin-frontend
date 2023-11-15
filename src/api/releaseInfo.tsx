import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";
import { NavigateFunction } from "react-router-dom";



export const GetGenreApi = () =>
    useQuery(
        [`getGenre`],
        async () => await api.get("createRelease/genreGet"),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData:true,
        }
    );

export const FeaturingArtisttPostApi = (setIsOpen:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/featuringArtisttPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Featuring Artist Created");
            queryClient.refetchQueries([`getFeaturingArtist`]);
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const PrimaryArtisttPostApi = (setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/primaryArtistPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Primary Artist Created");
            queryClient.refetchQueries([`GetPrimaryArtist`]);
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const GetFeaturingArtistApi = (id: any, setfeaturingArtistGet:any) =>
    useQuery(
        [`getFeaturingArtist`],
        async () => await api.get(`createRelease/featuringArtisttGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                setfeaturingArtistGet(res.data.data);
            },
        }
    );

export const GetPrimaryArtistApi = (id: any, setprimaryArtistGet: any) =>
    useQuery(
        [`GetPrimaryArtist`],
        async () => await api.get(`createRelease/primaryArtistGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                setprimaryArtistGet(res.data.data);
            },
        }
    );


export const UserDataApi = (setUserData: any, navigate: NavigateFunction) => {
    return useMutation((data:any) => api.post("user/userData", data), {
        onSuccess: (res) => {
            setUserData(res?.data?.data)
            if (res.data?.data === "token expired") {
                alert("Token expired login again");
                window.localStorage.clear();
                navigate('/sign-in');
            }
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const ReleaseInfoPostApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/releseInfoPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Created Successfully");
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetLanguagesApi = () =>
    useQuery(
        [` GetLanguages`],
        async () => await api.get(`createRelease/languageGet`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );


export const GetSubmissionsApi = (id: any) =>
    useQuery(
        [`GetSubmissions`],
        async () => await api.get(`createRelease/submissionGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );

export const SubmissionPostApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/submissionPost", data), {
        onSuccess: (res) => {
            cogoToast.success("submitted");
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}