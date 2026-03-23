import * as React from "react";
import { UpdateTicketAdminApi } from "../../../api/ticket";

export default function ListRow({ data, index, onRowClick, isSelected }: { data: any, index: number, onRowClick?: () => void, isSelected?: boolean }) {

    const rowNumber = index + 1;

    const { mutate: UpdateYoutubeClaims } = UpdateTicketAdminApi()

    const handleDownload = (link: any) => {
        const fileUrl = `https://api.fmdigitalofficial.com/${link}`;
        window.open(fileUrl, '_blank');
    };

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
                        className="px-3 py-1 text-center bg-white border border-green-700 text-green-700 text-xs rounded hover:bg-gray-100 focus:outline-none w-full font-medium"
                    >
                        DONE
                    </button>
                );
            default:
                return <></>;
        }
    };

    return (
        <tr
            onClick={onRowClick}
            className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
            }`}
        >
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {rowNumber}
            </td>
            <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700">
                {data.users_id || '--'}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700">
                {data.users?.[0]?.fname + " " + (data.users?.[0]?.lname || '') || '--'}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700 break-words">
                {data.users?.[0]?.email || '--'}
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
                <button
                    onClick={(e) => { e.stopPropagation(); handleDownload(data?.ticketDocument); }}
                    className="px-3 py-1 text-center bg-white border border-black text-black text-xs rounded hover:bg-gray-100 focus:outline-none"
                >
                    Download
                </button>
            </td>
            <td className="px-2 py-3 text-sm text-gray-700">
                {statusButton(data.Status)}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700">
                {data.Status === 0 ? (
                    <div className="flex flex-col gap-1.5">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                UpdateYoutubeClaims({ users_id: data.users_id, ticket_id: data.ticket_id, "Status": 4 })
                            }}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs w-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                UpdateYoutubeClaims({ users_id: data.users_id, ticket_id: data.ticket_id, "Status": 2 })
                            }}
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    <span className="text-xs text-gray-400">—</span>
                )}
            </td>
            <td className="px-2 py-3 text-sm text-gray-700 break-words">
                {data.created_at || '14/02/2025 10:33 PM'}
            </td>
        </tr>
    )
}