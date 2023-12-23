import * as React from "react";
import GetDate from "../../../../utility/GetDate";




export default function ListRow({ claim, index, currentPage, PAGE_SIZE }: { claim: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {claim.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {claim.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.Selectrelease || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.SelectAudio || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.SelectPolicy || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.createdAt ? GetDate(claim.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.PasteURL || '--'}
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