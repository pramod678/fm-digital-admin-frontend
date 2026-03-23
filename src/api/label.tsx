import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../lib/api";
import cogoToast from "@successtar/cogo-toast";

/**
 * Hook to create a new label submission.
 */
export const LabelPostApi = (setIsOpen: (open: boolean) => void, reset: () => void, setFile: (file: any) => void) => {
    const queryClient = useQueryClient();
    return useMutation((data: FormData) => api.post("createRelease/labelPost", data), {
        onSuccess: (res) => {
            cogoToast.success("Label Added");
            queryClient.refetchQueries([`GetAllLabels`]);
            reset()
            setFile(null)
            setIsOpen(false)
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message || "Something went wrong");
        }
    })
}

/**
 * Hook to update an existing label (e.g., after rejection).
 */
export const UpdateLabelApi = (id: number | string, setIsOpen: (open: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation((data: FormData) => api.put(`createRelease/labelUpdate/label_id/${id}`, data), {
        onSuccess: (res) => {
            cogoToast.success("Updated Successfully");
            setIsOpen(false)
            queryClient.refetchQueries([`GetAllLabels`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message || "Update failed");
        }
    })
}

/**
 * Hook to fetch all labels for a specific user.
 */
export const GetAllLabelsApi = (id: number | string) =>
    useQuery(
        [`GetAllLabels`, id],
        async () => await api.get(`createRelease/labelgetAll/${id}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: !!id
        }
    );

/**
 * Admin: Hook to fetch all labels with optional filters.
 */
export const GetAllAdminLabelsApi = (userId: string, statusId: string) =>
    useQuery(
        [`GetAllAdminLabels`, userId, statusId],
        async () => await api.get(`admin/label-get-all?user_id=${userId}&status=${statusId}`),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

/**
 * Admin: Hook to update label status (Approve/Reject).
 */
export const UpdateLabelAdminApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data: { label_id: number; Status: number; users_id?: number | string; remark?: string }) => api.put("admin/label-update", data), {
        onSuccess: (res) => {
            cogoToast.success("Label status updated");
            queryClient.refetchQueries([`GetAllAdminLabels`]);
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message || "Status update failed");
        }
    })
}