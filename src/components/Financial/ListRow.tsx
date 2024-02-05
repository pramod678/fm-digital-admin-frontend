import * as React from "react";
import GetDate from "../../utility/GetDate";
import EditUserFinancial from "./PopUps/EditUserFinancial";


export default function ListRow({ d, index }: { d: any, index: any }) {


    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-[#9dd3fc] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Pending</span>
                        </button>
                    </>
                );
            case 1:
                return (
                    <>
                        --
                    </>
                );
            case 2:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-red-500 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Reject</span>
                        </button>
                    </>
                );

            case 4:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0000cd] w-20 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none"
                        >
                            <span className=" text-white text-xs font-semibold">Approved</span>
                        </button>
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
                    {d.Date || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {GetDate(d.createdAt) || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.requested_amount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.approved_amount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.earning_amount || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {statusButton(d.Status)}
                </td>
            </tr>
        </>
    )
}