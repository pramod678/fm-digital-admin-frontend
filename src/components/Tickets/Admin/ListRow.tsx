import * as React from "react";
import { UpdateTicketAdminApi } from "../../../api/ticket";



export default function ListRow({ data, index, currentPage, PAGE_SIZE }: { data: any, index: any, currentPage: any, PAGE_SIZE: any }) {

    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const { mutate: UpdateYoutubeClaims } = UpdateTicketAdminApi()

    const handleDownload = (link: any) => {
        const fileUrl = `https://fmdigitalofficial.in/${link}`;

        // Open a new window with the file URL
        const newWindow = window.open(fileUrl, '_blank');
    };
    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <div className="flex items-center gap-2 w-full">
                            <button
                                type="submit"
                                className="px-4 w-20 text-center py-2 bg-yellow-500 text-xs text-white text-base rounded hover:bg-yellow-600 focus:outline-none "
                            >
                                <span className="mr-2 text-white font-semibold">Pending</span>
                            </button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="flex items-center gap-2 w-full">
                            <button
                                type="submit"
                                className="px-4 w-20 text-center py-2 bg-red-500 text-xs text-white text-base rounded hover:bg-red-600 focus:outline-none "
                            >
                                <span className="mr-2 text-white font-semibold">Reject</span>
                            </button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="flex items-center gap-2 w-full">
                            <button
                                type="submit"
                                className="px-4 w-20 text-center py-2 bg-green-500 text-xs text-white text-base rounded hover:bg-green-600 focus:outline-none "
                            >
                                <span className="mr-2 text-white font-semibold">Done</span>
                            </button>
                        </div>
                    </>
                );
            default:
                return <></>;
        }
    };
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.users[0]?.fname + " " + data.users[0]?.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.users[0].email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.reason || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.discreption || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span
                        onClick={() => handleDownload(data?.ticketDocument)}
                        className="font-semibold cursor-pointer"
                    >
                        Download
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {statusButton(data.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateYoutubeClaims({ users_id: data.users_id, ticket_id: data.ticket_id, "Status": 4 })
                            }}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateYoutubeClaims({ users_id: data.users_id, ticket_id: data.ticket_id, "Status": 2 })
                            }}
                        >
                            Reject
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}