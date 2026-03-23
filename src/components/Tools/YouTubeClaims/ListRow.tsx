import * as React from "react";
import GetDate from "../../../utility/GetDate";
import { IoLogoYoutube } from "react-icons/io";
import { SiSoundcloud } from "react-icons/si";
import { format } from "date-fns";

export default function ListRow({ claim, index, currentPage, PAGE_SIZE }: { claim: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const renderPlatformIcon = (platform: string, url: string) => {
        const lowerUrl = url?.toLowerCase() || "";
        const lowerPlatform = platform?.toLowerCase() || "";

        if (lowerPlatform.includes("youtube") || lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
            return (
                <div 
                    className="w-7 h-7 flex items-center justify-center bg-red-600 rounded-md cursor-pointer hover:bg-red-700 transition-colors shadow-sm"
                    onClick={() => window.open(url, '_blank')}
                    title="YouTube"
                >
                    <IoLogoYoutube className="text-white" size={16} />
                </div>
            );
        }
        if (lowerPlatform.includes("soundcloud") || lowerUrl.includes("soundcloud.com")) {
            return (
                <div 
                    className="w-7 h-7 flex items-center justify-center bg-[#ff5500] rounded-md cursor-pointer hover:bg-[#e04b00] transition-colors shadow-sm"
                    onClick={() => window.open(url, '_blank')}
                    title="SoundCloud"
                >
                    <SiSoundcloud className="text-white" size={18} />
                </div>
            );
        }
        // Fallback for other platforms
        return (
            <div 
                className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors shadow-sm"
                onClick={() => window.open(url, '_blank')}
            >
                <span className="text-[10px] font-bold text-gray-600 uppercase">{platform?.substring(0, 2) || "URL"}</span>
            </div>
        );
    };

    const StatusBadge = ({ status }: { status: number }) => {
        switch (status) {
            case 4: // Approved
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-green-500 text-[10px] font-bold text-green-500 uppercase bg-transparent">
                        Approved
                    </span>
                );
            case 2: // Rejected
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-red-500 text-[10px] font-bold text-red-500 uppercase bg-transparent">
                        Rejected
                    </span>
                );
            case 0: // Pending
            default:
                return (
                    <span className="inline-flex items-center px-2 py-0.5 rounded border border-blue-500 text-[10px] font-bold text-blue-500 uppercase bg-transparent">
                        Pending
                    </span>
                );
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

    const { date, time } = formatDate(claim.createdAt);

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-5 py-3 whitespace-nowrap text-[11px] text-gray-500 font-medium typo-table-cell">
                {actualIndex}
            </td>
            <td className="px-5 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell">
                {claim.Selectrelease || '--'}
            </td>
            <td className="px-5 py-3 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell">
                {claim.SelectAudio || '--'}
            </td>
            <td className="px-5 py-3 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                    {renderPlatformIcon(claim.Selectplatform, claim.PasteURL)}
                    {/* If multiple URLs were supported, we would map them here */}
                </div>
            </td>
            <td className="px-5 py-3 whitespace-nowrap text-[11px] text-gray-500 typo-table-cell">
                {claim.Reason || '--'}
            </td>
            <td className="px-5 py-3 whitespace-nowrap text-[11px] text-gray-600 font-medium typo-table-cell">
                {claim.SelectPolicy || '--'}
            </td>
            <td className="px-5 py-3 whitespace-nowrap">
                <StatusBadge status={claim.Status} />
            </td>
            <td className="px-5 py-3 whitespace-nowrap">
                <div className="flex flex-col">
                    <span className="text-[11px] text-gray-800 font-medium">{date}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{time}</span>
                </div>
            </td>
        </tr>
    );
}