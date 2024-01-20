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

export const GetAdminAllCatalogsApi = (userId: string, statusId?: string) =>
    useQuery(
        [`GetAdminAllCatalogs`, userId, statusId],
        async () => await api.get(`admin/catlogs-get-all?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            keepPreviousData:true,
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
