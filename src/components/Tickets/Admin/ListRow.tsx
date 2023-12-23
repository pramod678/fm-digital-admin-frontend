import * as React from "react";



export default function ListRow({ data, index }: { data: any, index: any }) {

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
            case 1:
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
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.reason || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.discreption || '--'}
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