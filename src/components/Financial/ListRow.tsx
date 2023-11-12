import * as React from "react";
import GetDate from "../../utility/GetDate";


export default function ListRow({ d, index }: { d: any, index: any }) {


    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.report || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.Date || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.totalAmount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-md ${d.status === 'Received' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}
                    >
                        {d.status || '--'}
                    </span>
                </td>
            </tr>
        </>
    )
}