import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";
import { NavigateFunction } from "react-router-dom";



export const GetGenreApi = () =>
    useQuery(
        [`getGenre`],
        async () => await api.get("createRelease/genreGet"),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

export const FeaturingArtisttPostApi = (setIsOpen: any) => {
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


export const SongsPostApi = ({ setIsOpen, refetch, reset }: { setIsOpen: any, refetch?: any, reset?:any }) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/songsInfoPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Song Added");
            refetch()
            reset()
            queryClient.refetchQueries([`GetSongs`]);
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const EditSongsApi = ({ setIsOpen, refetch, id }: { setIsOpen: any, refetch?: any, id?:any }) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/songsInfoUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("Song Updated");
            refetch()
            queryClient.refetchQueries([`GetSongs`]);
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetFeaturingArtistApi = (id: any) =>
    useQuery(
        [`getFeaturingArtist`],
        async () => await api.get(`createRelease/featuringArtisttGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );

export const GetPrimaryArtistApi = (id: any) =>
    useQuery(
        [`GetPrimaryArtist`],
        async () => await api.get(`createRelease/primaryArtistGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
            },
        }
    );


export const UserDataApi = (setUserData: any, navigate: NavigateFunction) => {
    return useMutation((data: any) => api.post("user/userData", data), {
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

export const ReleaseInfoPostApi = (navigate: NavigateFunction) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/releseInfoPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Created Successfully");
            navigate('/Songsinfo');
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const EditInfoReleaseApi = (navigate: NavigateFunction, id: any, refetch:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/releseInfoUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            navigate(`/Songsinfo/${id}`);
            refetch()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UpdatePrimaryArtistApi = (id: any, setIsOpen:any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/primaryArtistUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetPrimaryArtist`]);
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

export const GetPlatformApi = (id: any) =>
    useQuery(
        [`GetPlatform`, id],
        async () => await api.get(`createRelease/platformGetOne/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );


export const GetSubmissionsApi = (id: any) =>
    useQuery(
        [`GetSubmissions`, id],
        async () => await api.get(`createRelease/submissionGet/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );

export const GetReleaseInfoApi = (id: any) =>
    useQuery(
        [`GetReleaseInfo`, id],
        async () => await api.get(`createRelease/releseInfoGetOne/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );

export const GetReleaseInfoByIdApi = (id: any) =>
    useQuery(
        [`GetReleaseInfoById`, id],
        async () => await api.get(`createRelease/getByReleseInfoId/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );


export const SubmissionPostApi = (navigate: NavigateFunction) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/submissionPost", data), {
        onSuccess: (res) => {
            cogoToast.success("submitted");
            navigate('/Catalogs')
        },
        onError: ({ response }: { response?: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetSongsApi = (id: any) =>
    useQuery(
        [` GetSongs`, id],
        async () => await api.get(`createRelease/songsInfoGetEdit/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
        }
    );


export const DeleteSongApi = ( navigate: NavigateFunction, refetch: any) => {
    const queryClient = useQueryClient();
    return useMutation((data:any) => api.delete(`createRelease/songsInfoDelete/${data}`), {
        onSuccess: (res) => {
            cogoToast.success("deleted");
            refetch()
        },
        onError: ({ response }: { response?: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const GetLatestDraftsApi = () =>
    useQuery(
        [`GetLatestDrafts`],
        async () => await api.get(`createRelease/dasboardDraftgetAll/Status/${0}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );

export const GetLatestCoorectionsApi = () =>
    useQuery(
        [`GetLatestCoorections`],
        async () => await api.get(`createRelease/dasboardDraftgetAll/Status/${3}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );
