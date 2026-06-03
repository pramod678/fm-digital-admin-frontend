import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const GetCatalogsApi = (id: any, setcatalogsGet: any, selectedOption:any) =>
    useQuery(
        [`GetCatalogs`, selectedOption],
        async () => await api.get(`createRelease/catalogsGet/${id}/Status/${selectedOption}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: id ? true : false,
            onSuccess: (res) => {
                setcatalogsGet(res.data.result);
            },
        }
    );
    export const GetAdminAllCatalogsApi = (userId: string, status?: string, page: number = 1, limit: number = 10) =>
    useQuery(
        [`GetAdminAllCatalogs`, userId, status, page, limit],
        async () => await api.get(`admin/catlogs-get-all?user_id=${userId}&status=${status !== "" && status !== undefined ? status : ""}&page=${page}&limit=${limit}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );
export const GetAdminReleaseCatalogsApi = (userId: string, status?: string, page: number = 1, limit: number = 10, search: string = "") =>
    useQuery(
        [`GetAdminReleaseCatalogs`, userId, status, page, limit, search],
        async () => await api.get(`admin/catlogs-get-release?user_id=${userId}&status=${status !== "" && status !== undefined ? status : ""}&page=${page}&limit=${limit}&search=${search}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

export const GetAdminCatalogSongsApi = (userId: string, releaseInfoId: string, page: number = 1, limit: number = 25) =>
    useQuery(
        [`GetAdminCatalogSongs`, userId, releaseInfoId, page, limit],
        async () => await api.get(`admin/catlogs-get-songs?user_id=${userId}&releaseInfo_id=${releaseInfoId}&page=${page}&limit=${limit}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: !!releaseInfoId,
        }
    );

export const GetAdminCatalogPlatformApi = (userId: string, releaseInfoId: string, page: number = 1, limit: number = 25) =>
    useQuery(
        [`GetAdminCatalogPlatform`, userId, releaseInfoId, page, limit],
        async () => await api.get(`admin/catlogs-get-platform?user_id=${userId}&releaseInfo_id=${releaseInfoId}&page=${page}&limit=${limit}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: !!releaseInfoId,
        }
    );
export const GetAdminPrimaryArtistApi = (userId: string, releaseInfoId: string, page: number = 1, limit: number = 25) =>
    useQuery(
        [`GetAdminPrimaryArtist`, userId, releaseInfoId, page, limit],
        async () => await api.get(`admin/catlogs-get-primary-artist?user_id=${userId}&releaseInfo_id=${releaseInfoId}&page=${page}&limit=${limit}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: !!releaseInfoId,
        }
    );
export const UpdateAdminCatalogApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put(`/admin/relese-info-update`, data), {
        onSuccess: (res) => {
            cogoToast.success("Catalogue updated");
            queryClient.refetchQueries([`GetAdminAllCatalogs`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}


export const DeleteCatalogApi = ({ id }: { id: any }) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.delete(`createRelease/catalogsDelete/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("Catalogue Deleted");
            queryClient.refetchQueries([`GetCatalogs`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}
