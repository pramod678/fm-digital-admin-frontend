import * as React from "react";
import { FaChevronDown, FaChevronUp, FaEdit } from "react-icons/fa";
import LabelTable from "../../ManageUser/Label/LabelTable";
import { IoLogoYoutube } from "react-icons/io";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import { UpdateLabelAdminApi } from "../../../api/label";
import axios from "axios";
import { BsCheckCircle } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import ConfirmationButton from "../../../ui/ConfirmationButton";
// import UpdateLabel from "./PopUps/UpdateLabel";


export default function LabelListRow({ label, index, currentPage, PAGE_SIZE }: { label: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };

    const handleDownload = (link: any) => {
        const fileUrl = `https://api.fmdigitalofficial.com/${link}`;

        // Open a new window with the file URL
        const newWindow = window.open(fileUrl, '_blank');
    };

    const iconSelector = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        --
                    </>
                );
            case 1:
                return (
                    <p style={{ color: "green" }}>
                        <BsCheckCircle size={size} />
                    </p>
                );
            case 2:
                return (
                    <p style={{ color: "#add8e6" }}>
                        <FcCancel size={size} />
                    </p>
                );
            case 4:
                return (
                    <p style={{ color: "green" }}>
                        <BsCheckCircle size={size} />
                    </p>
                );
            default:
                return <></>;
        }
    };


    const { mutate: UpdateLabelAdmin } = UpdateLabelAdminApi()
    const size = useResponsiveIconSize()
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {label.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label?.users[0]?.fname + " " + label?.users[0]?.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {label?.users[0]?.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {label.title || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => handleUrlClick(label.youtubeURL)}>
                    <IoLogoYoutube size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span
                        onClick={() => handleDownload(label?.labelDocument)}
                        className="font-semibold cursor-pointer"
                    >
                        Download
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {iconSelector(label.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <ConfirmationButton onConfirm={() => {
                            UpdateLabelAdmin({ users_id: label.users_id, label_id: label.label_id, "Status": 4 })
                        }} title={"Are you sure you want to Approve Label ?"} >
                            <button
                                type="button"
                                className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Approve Label
                            </button>
                        </ConfirmationButton>

                        <ConfirmationButton onConfirm={() => {
                            UpdateLabelAdmin({ users_id: label.users_id, label_id: label.label_id, "Status": 2 })
                        }} title={"Are you sure you want to Reject Label ?"} >
                            <button
                                type="button"
                                className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            >
                                Reject Label
                            </button>
                        </ConfirmationButton>
                    </div>
                </td>
            </tr>

        </>
    )
}