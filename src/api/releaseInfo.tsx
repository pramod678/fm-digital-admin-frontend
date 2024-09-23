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


export const SongsPostApi = ({ setIsOpen, refetch, reset, setFile }: { setIsOpen: any, refetch?: any, reset?: any, setFile?: any }) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/songsInfoPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Song Added");
            setFile(null)
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

export const EditSongsApi = ({ setIsOpen, refetch, id, setFile }: { setIsOpen: any, refetch?: any, id?: any, setFile?: any, setStartDate?: any }) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/songsInfoUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("Song Updated");
            setFile(null)
            refetch()
            queryClient.refetchQueries([`GetSongs`]);
            queryClient.refetchQueries([`GetAdminAllCatalogs`]);
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

export const GetAllAdminPrimaryArtistApi = (userId: any) =>
    useQuery(
        [`GetAllAdminPrimaryArtist`, userId],
        async () => await api.get(`admin/primary-artist-get-all?user_id=${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );

export const GetAllAdminFeaturingArtistApi = (userId: any, showPrimaryArtist: any) =>
    useQuery(
        [`GetAllAdminFeaturingArtist`, userId, showPrimaryArtist],
        async () => await api.get(`admin/featuring-artist-get-all?user_id=${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );

export const UserDataApi = (setUserData: any, navigate: NavigateFunction) => {
    return useMutation((data: any) => api.post("user/userData", data), {
        onSuccess: (res) => {
            setUserData(res?.data?.data)
            if (res.data?.data === "token expired") {
                cogoToast.success("Token Expired");
                navigate('/sign-in');
            }
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        },
        retry: 1
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

export const EditInfoReleaseApi = (navigate: NavigateFunction, id: any, refetch: any) => {
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

export const AdminEditInfoReleaseApi = (id: any, refetch: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`createRelease/releseInfoUpdate/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetAdminAllCatalogs`])
            refetch()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UpdatePrimaryArtistApi = (id: any, setIsOpen: any) => {
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

export const UpdateAdminPrimaryArtistApi = (id: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`admin/primary-artist-update/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetAllAdminPrimaryArtist`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UpdateAdminFeaturingArtistApi = (id: any, setIsOpen: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.put(`admin/featuring-artist-update/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetAllAdminFeaturingArtist`]);
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


export const DeleteSongApi = (navigate: NavigateFunction, refetch: any) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.delete(`createRelease/songsInfoDelete/${data}`), {
        onSuccess: (res) => {
            cogoToast.success("deleted");
            refetch()
        },
        onError: ({ response }: { response?: any }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const GetLatestDraftsApi = (userId: any) =>
    useQuery(
        [`GetLatestDrafts`, userId],
        async () => await api.get(`createRelease/dasboardDraftgetAll/Status/${0}/users_id/${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: userId ? true : false,
            onSuccess: (res) => {
            },
        }
    );

export const GetLatestCoorectionsApi = (userId: any) =>
    useQuery(
        [`GetLatestCoorections`, userId],
        async () => await api.get(`createRelease/dasboardDraftgetAll/Status/${3}/users_id/${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: userId ? true : false,
            onSuccess: (res) => {
            },
        }
    );

export const GetDashBoardStatsApi = () =>
    useQuery(
        [`GetDashBoardStats`],
        async () => await api.get(`admin/dashBoard-get-all`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );

export const GetDashboardsLinksApi = (active: any) =>
    useQuery(
        [`GetDashBoardLinks+${active}`, active],
        async () => await api.get(`admin/dashBoard-get-link-all?spotify_active=${active}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
            },
        }
    );

export const CreateDashboardLinkApi = (reset: any) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.post("admin/dashBoard-link-create", data), {
        onSuccess: (res) => {
            cogoToast.success("Link Added");
            queryClient.refetchQueries([`GetDashBoardLinks`]);
            reset()
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const UpdateDashboardLinkApi = (setIsEditing: any, setReadMode: any) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(`admin/dashBoard-link-update/${data?.dashBoard_id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("Link Updated");
            queryClient.refetchQueries([`GetDashBoardLinks+${res.data?.spotify_active}`]);
            setIsEditing(false)
            setReadMode(true)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}