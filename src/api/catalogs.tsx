import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";


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
                console.log(res.data.result)
                setcatalogsGet(res.data.result);
            },
        }
    );

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
