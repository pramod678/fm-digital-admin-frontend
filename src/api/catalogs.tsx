import { useQuery } from "react-query";
import api from "../lib/api";


export const GetCatalogsApi = (id: any, setcatalogsGet:any) =>
    useQuery(
        [`GetCatalogs`],
        async () => await api.get(`createRelease/catalogsGet/${id}`),
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
