import * as React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { SiSoundcloud } from "react-icons/si";
import { format } from "date-fns";
import { UpdateYoutubeClaimsApi } from "../../../../api/youtubeClaims";

interface ListRowProps {
    claim: any;
    index: number;
    currentPage: number;
    PAGE_SIZE: number;
    tableType: "pending" | "history";
    onRejectClick?: () => void;
}

export default function ListRow({ claim, index, currentPage, PAGE_SIZE, tableType, onRejectClick }: ListRowProps) {
    const actualIndex = tableType === "history" ? (currentPage - 1) * PAGE_SIZE + index + 1 : index + 1;
    const { mutate: UpdateYoutubeClaims } = UpdateYoutubeClaimsApi();

    const renderPlatformIcons = (url: string, platform: string) => {
        const lowerUrl = url?.toLowerCase() || "";
        const lowerPlatform = platform?.toLowerCase() || "";
        
        // Split URLs if multiple (assuming they might be comma or space separated in data)
        const urls = url?.split(/[ ,]+/).filter(u => u.trim() !== "") || [url];
        
        return (
            <div className="flex items-center gap-1.5 flex-wrap">
                {urls.map((u, i) => {
                    const lU = u.toLowerCase();
                    if (lU.includes("youtube.com") || lU.includes("youtu.be") || lowerPlatform.includes("youtube")) {
                        return (
                            <div key={i} className="w-6 h-6 flex items-center justify-center bg-red-600 rounded-md cursor-pointer hover:bg-red-700 transition-shadow shadow-sm" onClick={() => window.open(u, '_blank')} title="YouTube">
                                <IoLogoYoutube className="text-white" size={14} />
                            </div>
                        );
                    }
                    if (lU.includes("soundcloud.com") || lowerPlatform.includes("soundcloud")) {
                        return (
                            <div key={i} className="w-6 h-6 flex items-center justify-center bg-[#ff5500] rounded-md cursor-pointer hover:bg-[#e04b00] transition-shadow shadow-sm" onClick={() => window.open(u, '_blank')} title="SoundCloud">
                                <SiSoundcloud className="text-white" size={16} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    };

    const StatusBadge = ({ status }: { status: number }) => {
        const base = "inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase bg-transparent min-w-[65px] justify-center";
        switch (status) {
            case 4:
                return <span className={`${base} border-green-500 text-green-500`}>Approved</span>;
            case 2:
                return <span className={`${base} border-red-500 text-red-500`}>Rejected</span>;
            case 0:
            default:
                return <span className={`${base} border-blue-500 text-blue-500`}>Pending</span>;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return { d: "--", t: "--" };
        try {
            const date = new Date(dateString);
            return {
                d: format(date, "dd/MM/yyyy"),
                t: format(date, "hh:mm a")
            };
        } catch (e) {
            return { d: "--", t: "--" };
        }
    };

    const { d, t } = formatDate(claim.createdAt || claim.updatedAt);

    if (tableType === "pending") {
        return (
            <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 font-medium typo-table-cell">{actualIndex}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-bold typo-table-cell">{claim.users_id || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-medium typo-table-cell">{claim?.users[0]?.fname + " " + claim?.users[0]?.lname || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-400 font-medium typo-table-cell truncate max-w-[120px]">{claim?.users[0]?.email || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell truncate max-w-[150px]">{claim.Selectrelease || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell truncate max-w-[150px]">{claim.SelectAudio || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap">{renderPlatformIcons(claim.PasteURL, claim.Selectplatform)}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell">{claim.Selectplatform || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell">{claim.SelectPolicy || '--'}</td>
                <td className="px-2 py-3 whitespace-nowrap"><StatusBadge status={claim.Status} /></td>
                <td className="px-2 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-gray-800 font-bold leading-tight">{d}</span>
                        <span className="text-[10px] text-gray-400 font-medium mb-2">{t}</span>
                        <div className="flex gap-2">
                            <button 
                                className="bg-[#00c26d] hover:bg-[#00a65d] text-white py-1 px-3 rounded-md text-[10px] font-bold shadow-sm transition-all"
                                onClick={() => {
                                    /* BACKEND NOTE: This call updates the claim status to 4 (Approved) */
                                    UpdateYoutubeClaims({ users_id: claim.users_id, youtubeClaims_id: claim.youtubeClaims_id, "Status": 4 })
                                }}
                            >
                                Approve
                            </button>
                            <button 
                                className="bg-[#e63946] hover:bg-[#d62828] text-white py-1 px-3 rounded-md text-[10px] font-bold shadow-sm transition-all"
                                onClick={() => {
                                    /* BACKEND NOTE: This call now opens the rejection modal to collect a reason */
                                    onRejectClick && onRejectClick();
                                }}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    // Default: History row
    return (
        <tr className="hover:bg-gray-50/50 transition-colors">
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 font-medium typo-table-cell">{actualIndex}</td>
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-bold typo-table-cell">{claim.users_id || '--'}</td>
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell truncate max-w-[180px]">{claim.Selectrelease || '--'}</td>
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell truncate max-w-[180px]">{claim.SelectAudio || '--'}</td>
            <td className="px-2 py-3 whitespace-nowrap">{renderPlatformIcons(claim.PasteURL, claim.Selectplatform)}</td>
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell italic truncate max-w-[120px]">{claim.Reason || '--'}</td>
            <td className="px-2 py-3 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell">{claim.SelectPolicy || '--'}</td>
            <td className="px-2 py-3 whitespace-nowrap"><StatusBadge status={claim.Status} /></td>
            <td className="px-2 py-3 whitespace-nowrap">
                <div className="flex flex-col">
                    <span className="text-[11px] text-gray-800 font-bold leading-tight">{d}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{t}</span>
                </div>
            </td>
        </tr>
    );
}