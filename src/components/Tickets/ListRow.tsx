import * as React from "react";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";



export default function ListRow({ data, index }: { data: any, index: any }) {

    const size = useResponsiveIconSize();
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index+1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.reason || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.createdAt || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <button
                            className={`px-4 py-1 border-2 ${ data.status === 'Done'
                                        ? 'border-green-500 text-green-500'
                                        : 'border-neutral-500 text-neutral-500'
                                }`}
                        >
                            {data.status || '--'}
                        </button>
                </td>
            </tr>
        </>
    )
}