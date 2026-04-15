import * as React from "react";
import LabelTable from "../../ManageUser/Label/LabelTable";
import { FaYoutube, FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { UpdateLabelAdminApi } from "../../../api/endpoint";
import ConfirmationButton from "../../../ui/ConfirmationButton";
import UpdateLabel from "../PopUps/UpdateLabel";
import cogoToast from "@successtar/cogo-toast";


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

    const getStatusBadge = (status: number) => {
        switch (status) {
            case 0:
                return (
                    <span className="px-3 py-0.5 rounded-full border border-gray-200 bg-white text-gray-800 typo-btn-action shadow-sm whitespace-nowrap normal-case">
                        Pending
                    </span>
                );
            case 4:
                return (
                    <span className="px-3 py-0.5 rounded-full border border-[#00b768]/30 bg-[#e6f7ef] text-[#00b768] typo-btn-action shadow-sm whitespace-nowrap normal-case">
                        Approved
                    </span>
                );
            case 2:
                return (
                    <span className="px-3 py-0.5 rounded-full border border-pink-200 bg-[#fef2f2] text-pink-600 typo-btn-action shadow-sm whitespace-nowrap normal-case">
                        Rejected
                    </span>
                );
            default:
                return <span className="text-gray-400 font-bold text-[9px]">--</span>;
        }
    };

    const copyToClipboard = (e: React.MouseEvent, text: string) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        cogoToast.success("Link copied to clipboard!");
    };


    const { mutate: UpdateLabelAdmin } = UpdateLabelAdminApi()
    
    return (
        <>
            <tr className="hover:bg-gray-50/50 transition-colors group bg-white">
                {/* No. */}
                <td className="px-3 py-3 typo-table-cell border-b border-gray-100">
                    {actualIndex}
                </td>

                {/* User Id */}
                <td className="px-2 py-3 whitespace-nowrap typo-table-cell border-b border-gray-100">
                    {label.users_id || '--'}
                </td>

                {/* User Name */}
                <td className="px-2 py-3 typo-table-cell-strong border-b border-gray-100">
                    {label?.users?.[0] ? `${label.users[0].fname} ${label.users[0].lname}` : '--'}
                </td>

                {/* Email */}
                <td className="px-2 py-3 typo-table-cell border-b border-gray-100 break-all text-gray-500">
                    {label?.users?.[0]?.email || '--'}
                </td>

                {/* Channel Name */}
                <td className="px-2 py-3 typo-table-cell border-b border-gray-100">
                    {label.title || '--'}
                </td>

                {/* Channel URL */}
                <td className="px-2 py-3 whitespace-nowrap border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                        <FaYoutube 
                            className="text-gray-900 cursor-pointer hover:text-red-600 transition-colors" 
                            size={14} 
                            onClick={(e) => { e.stopPropagation(); handleUrlClick(label.youtubeURL); }}
                        />
                        <FaCopy 
                            className="text-gray-900 cursor-pointer hover:text-[#00b768] transition-colors" 
                            size={12} 
                            onClick={(e) => copyToClipboard(e, label.youtubeURL)}
                        />
                    </div>
                </td>

                {/* Attachment */}
                <td className="px-2 py-3 whitespace-nowrap border-b border-gray-100 text-center">
                    <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(label?.labelDocument); }}
                        className="rounded border border-gray-200 bg-gray-50 text-gray-600 typo-btn-action hover:bg-gray-100 w-16"
                    >
                        Download
                    </button>
                </td>

                {/* Status */}
                <td className="px-2 py-3 whitespace-nowrap text-center border-b border-gray-100">
                    {getStatusBadge(label.Status)}
                </td>

                {/* Action */}
                <td className="px-2 py-3 whitespace-nowrap border-b border-gray-100">
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1 flex-col">
                            <ConfirmationButton onConfirm={() => {
                                UpdateLabelAdmin({ users_id: label.users_id, label_id: label.label_id, "Status": 4 })
                            }} title={"Approve Label?"} >
                                <button
                                    type="button"
                                    className="bg-green-600 hover:bg-green-700 text-white typo-btn-action w-[48px] normal-case"
                                >
                                    Approve
                                </button>
                            </ConfirmationButton>

                            <ConfirmationButton onConfirm={() => {
                                UpdateLabelAdmin({ users_id: label.users_id, label_id: label.label_id, "Status": 2 })
                            }} title={"Reject Label?"} >
                                <button
                                    type="button"
                                    className="bg-red-500 hover:bg-red-600 text-white typo-btn-action w-[48px] normal-case"
                                >
                                    Reject
                                </button>
                            </ConfirmationButton>
                        </div>
                        
                        <div className="flex items-center gap-0.5 ml-1">
                            <UpdateLabel userData={label.users?.[0]} labelData={label} />
                            
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    );
}