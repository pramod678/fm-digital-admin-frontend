import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import LabelTable from "./LabelTable";


export default function ManageLabelListRow({ data, index, currentPage, PAGE_SIZE }: { data: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.fname + " " + data.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.phone || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.pending}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex justify-end">
                    {isOpen ? (
                        <FaChevronUp className="text-gray-500" />
                    ) : (
                        <FaChevronDown className="text-gray-500" />
                    )}
                </td>
            </tr>
            {isOpen && (
                <tr className="">
                    <td colSpan={10} className="p-4">
                        <LabelTable labelData={data.labelData} />
                    </td>
                </tr>
            )}
            <tr className="">
                <td colSpan={10}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <Link to={`/ManageUser/Catalogs/${data.users_id}`}>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {
                                }}
                            >
                                Go to Catalog
                            </button>
                        </Link>
                        <Link to={`/ManageUser`}>
                            <button
                                type="button"
                                className="bg-[#00CED1] hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {
                                }}
                            >
                                User Details
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}