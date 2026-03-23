import * as React from "react";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";

export default function ListRow({ link, index, currentPage, PAGE_SIZE }: { link: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    
    const handleUrlClick = (url: any) => {
        if (url) window.open(url, '_blank');
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '--';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = `${hours}:${minutes} ${ampm}`;
        
        return `${day}/${month}/${year} ${strTime}`;
    };

    const statusBadge = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <span className="inline-flex items-center px-3 py-1 border border-gray-400 text-gray-700 text-[10px] font-bold uppercase rounded-lg bg-white typo-btn-action min-w-[80px]">
                        Pending
                    </span>
                );
            case 2:
                return (
                    <span className="inline-flex items-center px-3 py-1 border-2 border-red-500 text-red-500 text-[10px] font-bold uppercase rounded-lg bg-white typo-btn-action min-w-[80px]">
                        Rejected
                    </span>
                );
            case 4:
                return (
                    <span className="inline-flex items-center px-3 py-1 border-2 border-green-500 text-green-500 text-[10px] font-bold uppercase rounded-lg bg-white typo-btn-action min-w-[80px]">
                        Approved
                    </span>
                );
            default:
                return <span className="text-gray-400 typo-table-cell text-[10px]">--</span>;
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 font-['Poppins']">
            <td className="px-6 py-5 whitespace-nowrap text-[11px] text-gray-500 font-medium typo-table-cell">
                {actualIndex}
            </td>

            <td className="px-6 py-5 whitespace-nowrap text-[11px] text-gray-800 font-semibold typo-table-cell typo-table-cell-strong">
                {link.Selectrelease || '--'}
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-[11px] text-gray-600 font-medium typo-table-cell">
                {link.SelectAudio || '--'}
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-[11px] text-gray-600 font-bold typo-table-cell typo-table-cell-strong">
                {link.ArtistName || '--'}
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-center">
                <button 
                    onClick={() => handleUrlClick(link.FecebookLink)} 
                    className="text-[#3b5998] hover:scale-110 transition-transform inline-block"
                >
                    <FaFacebookSquare size={22} />
                </button>
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-center">
                <button 
                    onClick={() => handleUrlClick(link.InstagramLink)} 
                    className="text-[#e4405f] hover:scale-110 transition-transform inline-block"
                >
                    <GrInstagram size={22} />
                </button>
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-[11px] text-gray-500 font-bold typo-table-cell">
                {link.Reason || '--'}
            </td>
            <td className="px-6 py-5 whitespace-nowrap text-center">
                {statusBadge(link.Status)}
            </td>
            <td className="px-6 py-5 whitespace-nowrap typo-table-cell leading-tight">
                {link.createdAt ? (
                    <div className="flex flex-col">
                        <span className="text-[11px] text-gray-800 font-medium">{formatDate(link.createdAt).split(' ')[0]}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{formatDate(link.createdAt).split(' ')[1]} {formatDate(link.createdAt).split(' ')[2]}</span>
                    </div>
                ) : '--'}
            </td>
        </tr>
    );
}