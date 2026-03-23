import * as React from "react";
import { UpdateTicketAdminApi } from "../../../api/ticket";

export default function ListRow({ data, index }: { data: any, index: number }) {

    const rowNumber = index + 1;

    const { mutate: UpdateYoutubeClaims } = UpdateTicketAdminApi()

    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <button
                        type="button"
                        className="px-3 py-1 text-center bg-white border border-black text-black text-xs rounded hover:bg-gray-100 focus:outline-none w-full"
                    >
                        Pending
                    </button>
                );
            case 2:
                return (
                     <button
                        type="button"
                        className="px-3 py-1 text-center bg-white border border-black text-black text-xs rounded hover:bg-gray-100 focus:outline-none w-full"
                    >
                        Pending
                    </button>
                );
            case 4:
                return (
                    <button
                        type="button"
                        className="py-1 px-3 text-center bg-white border border-green-700 text-green-700 text-xs rounded hover:bg-gray-100 focus:outline-none w-full"
                    >
                        DONE
                    </button>
                );
            default:
                return <></>;
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {rowNumber}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700 break-words">
                {data.reason || '--'}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700 break-words">
                {data.discreption || '--'}
            </td>
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {data.ticket_id || '--'}
            </td>
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {data.created_at || '14/02/2025 10:33 PM'}
            </td>
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {data.created_at || '14/02/2025 10:33 PM'}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700">
                {statusButton(data.Status)}
            </td>
        </tr>
    )
}
