import * as React from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import LabelTable from "../../ManageUser/Label/LabelTable";
import { IoLogoYoutube } from "react-icons/io";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
// import UpdateLabel from "./PopUps/UpdateLabel";


export default function LabelListRow({ label, index }: { label: any, index: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const size = useResponsiveIconSize()
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {label.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {label.channelName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {label.channelUrl || '--'} */}
                    <IoLogoYoutube size={size} />
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