import * as React from "react";
import GetDate from "../../../../utility/GetDate";



export default function ListRow({ link, index, currentPage, PAGE_SIZE }: { link: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {actualIndex + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {link.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {link.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.Selectrelease || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.SelectAudio || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.Selectplatform || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.FecebookLink || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.InstagramLink || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.createdAt ? GetDate(link.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                            }}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
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