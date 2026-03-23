import * as React from "react";
import GetDate from "../../utility/GetDate";
import { FaEdit } from "react-icons/fa";
import { MdBookmarks } from "react-icons/md";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import UpdateLabel from "./PopUps/UpdateLabel";
import { IoLogoYoutube } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { Label } from "../../types/label";

export default function ListRow({ label, index, userData }: { label: Label, index: number, userData: any }) {
    const size = useResponsiveIconSize();
    
    const handleUrlClick = (link: any) => {
        if (link) window.open(link, '_blank');
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optionally add a toast here
    };

    const renderStatusBadge = (status: any) => {
        switch (status) {
            case 1:
            case 4:
                return (
                    <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded typo-btn-action">
                        DONE
                    </span>
                );
            case 2:
                return (
                    <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded typo-btn-action">
                        REJECTED
                    </span>
                );
            case 3:
                return (
                    <span className="px-3 py-1 bg-gray-50 text-gray-500 border border-gray-200 rounded typo-btn-action">
                        DRAFT
                    </span>
                );
            case 0:
            default:
                return (
                    <span className="px-3 py-1 bg-white text-gray-800 border border-gray-300 rounded typo-btn-action">
                        Pending
                    </span>
                );
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap typo-table-cell-strong text-gray-500">
                {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap typo-table-cell-strong">
                {label.title || '--'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap typo-table-cell">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => handleUrlClick(label.youtubeURL)}
                        className="p-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                        title="Open on YouTube"
                    >
                        <IoLogoYoutube size={16} />
                    </button>
                    <button 
                        onClick={() => handleCopy(label.youtubeURL)}
                        className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                        title="Copy URL"
                    >
                        <MdContentCopy size={16} />
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                {renderStatusBadge(label.Status)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col">
                    <span className="typo-table-cell-strong text-gray-700">
                        {label.created_at ? GetDate(label.created_at) : '--'}
                    </span>
                    <span className="typo-table-cell text-gray-400">
                        {label.created_at ? new Date(label.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center">
                    {(label.Status !== 1 && label.Status !== 4) ? (
                        <UpdateLabel userData={userData} labelData={label} />
                    ) : (
                        <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-200 bg-gray-50 pointer-events-none">
                            <FaEdit size={14} className="opacity-40" />
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}