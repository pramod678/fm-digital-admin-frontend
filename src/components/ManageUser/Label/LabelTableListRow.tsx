import * as React from "react";
import { Link } from "react-router-dom";



export default function LabelTableListRow({ data, index }: { data: any, index: any }) {

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.artistId || '--'} */}
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.channelName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.channelUrl || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <p>Download</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                            }}
                        >
                            Approve Label
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                            }}
                        >
                            Reject Label
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}