import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "cogo-toast";


export const TicketPostApi = (setIsOpen: any, reset: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/ticketPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Ticket Added");
            queryClient.refetchQueries([` GetAllTicket`]);
            reset()
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAllTicketApi = () =>
    useQuery(
        [` GetAllTicket`],
        async () => await api.get(`createRelease/ticketgetAll`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );