import * as React from "react";
import { format } from "date-fns";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { UpdateProfileLinkingPostApi } from "../../../../api/profileLinking";

interface ListRowProps {
    link: any;
    index: number;
    currentPage?: number;
    PAGE_SIZE?: number;
    type: "pending" | "history";
    onReject?: (profile: any) => void;
}

export default function ListRow({ link, index, currentPage = 1, PAGE_SIZE = 10, type, onReject }: ListRowProps) {
    const actualIndex = type === "pending" ? index + 1 : (currentPage - 1) * PAGE_SIZE + index + 1;
    
    // BACKEND INTEGRATION (Placeholder)
    const { mutate: UpdateProfileLinkingPost } = UpdateProfileLinkingPostApi();

    const handleAction = (status: number) => {
        const actionLabel = status === 4 ? "Approve" : "Reject";
        console.log(`[Admin Action] ${actionLabel} profile for User ID: ${link.users_id}`);
        alert(`${actionLabel} profile for ${link?.users?.[0]?.fname || "User"} (Disabled for UI Revamp)`);
        
        /* 
           BACKEND NOTE:
           Uncomment the line below to re-enable actual backend integration.
        */
        // UpdateProfileLinkingPost({ users_id: link.users_id, profileLinking_id: link.profileLinking_id, "Status": status });
    };

    const handleUrlClick = (url: string) => {
        if (url) window.open(url, '_blank');
    };

    const statusBadge = (status: number) => {
        switch (status) {
            case 0:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 border border-gray-400 text-gray-700 text-[10px] font-bold uppercase rounded bg-white typo-btn-action">
                        Pending
                    </span>
                );
            case 2:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 border border-red-500 text-red-500 text-[10px] font-bold uppercase rounded bg-white typo-btn-action">
                        Rejected
                    </span>
                );
            case 4:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 border border-green-500 text-green-500 text-[10px] font-bold uppercase rounded bg-white typo-btn-action">
                        Approved
                    </span>
                );
            default:
                return <span className="text-gray-400 typo-table-cell text-[10px]">--</span>;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return { date: "--", time: "--" };
        try {
            const date = new Date(dateString);
            return {
                date: format(date, "dd/MM/yyyy"),
                time: format(date, "hh:mm a")
            };
        } catch (e) {
            return { date: "--", time: "--" };
        }
    };

    const { date, time } = formatDate(type === "pending" ? link.createdAt : (link.updatedAt || link.createdAt));

    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 font-['Poppins']">
            <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-500 font-medium typo-table-cell">
                {actualIndex}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell typo-table-cell-strong">
                {link.users_id || '--'}
            </td>

            {type === "pending" && (
                <>
                    <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-700 typo-table-cell">
                        {link?.users?.[0]?.fname + " " + link?.users?.[0]?.lname || '--'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-600 typo-table-cell">
                        {link?.users?.[0]?.email || '--'}
                    </td>
                </>
            )}

            <td className="px-4 py-4 whitespace-normal text-[11px] text-gray-600 font-medium typo-table-cell max-w-[150px]">
                {link.Selectrelease || '--'}
            </td>
            <td className="px-4 py-4 whitespace-normal text-[11px] text-gray-600 typo-table-cell max-w-[150px]">
                {link.SelectAudio || '--'}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell typo-table-cell-strong">
                {link.ArtistName || '--'}
            </td>

            <td className="px-4 py-4 whitespace-nowrap text-center">
                <button 
                    onClick={() => handleUrlClick(link.FecebookLink)} 
                    className="text-[#3b5998] hover:scale-110 transition-transform inline-block"
                >
                    <FaFacebookSquare size={20} />
                </button>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-center">
                <button 
                    onClick={() => handleUrlClick(link.InstagramLink)} 
                    className="text-[#e4405f] hover:scale-110 transition-transform inline-block"
                >
                    <GrInstagram size={20} />
                </button>
            </td>

            {type === "history" && (
                <td className="px-4 py-4 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell">
                    {link.Reason || '--'}
                </td>
            )}

            <td className="px-4 py-4 whitespace-nowrap text-center">
                {statusBadge(link.Status)}
            </td>

            <td className="px-4 py-4 whitespace-nowrap typo-table-cell leading-tight">
                <div className="flex flex-col">
                    <span className="text-[11px] text-gray-700 font-medium">{date}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{time}</span>
                    
                    {type === "pending" && (
                        <div className="flex gap-2 mt-2">
                            <button
                                type="button"
                                className="px-3 py-1 bg-[#10b981] text-white text-[10px] font-bold rounded hover:bg-green-700 transition-colors uppercase typo-btn-action shadow-sm"
                                onClick={() => handleAction(4)}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="px-3 py-1 bg-[#ef4444] text-white text-[10px] font-bold rounded hover:bg-red-700 transition-colors uppercase typo-btn-action shadow-sm"
                                onClick={() => onReject ? onReject(link) : handleAction(2)}
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}