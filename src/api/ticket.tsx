import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";


export const TicketPostApi = (setIsOpen: any, reset: any, setFile: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("createRelease/ticketPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Ticket Added");
            queryClient.refetchQueries([` GetAllTicket`]);
            reset()
            setFile(null)
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}

export const GetAllTicketApi = (userId: any) =>
    useQuery(
        [` GetAllTicket`, userId],
        async () => await api.get(`createRelease/ticketgetAll/users_id/${userId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const GetAllAdminTicketApi = (userId:string, statusId:string) =>
    useQuery(
        [`GetAllAdminTicket`, userId, statusId],
        async () => await api.get(`admin/ticket-get-all?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

export const UpdateTicketAdminApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.put("admin/ticket-update", data), {
        onSuccess: (res) => {
            cogoToast.success("ticket updated");
            queryClient.refetchQueries([`GetAllAdminTicket`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    })
}