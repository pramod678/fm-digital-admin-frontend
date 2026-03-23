import * as React from "react";
import Edit from "../../PopUps/EditManageArtist";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { FiTrash2 } from "react-icons/fi";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import EditAdminManageArtist from "../PopUps/EditAdminManageArtist";
import { FaUserEdit } from "react-icons/fa";


export default function ListRow({ data, index, currentPage, PAGE_SIZE }: { data: any, index: any, currentPage: any, PAGE_SIZE: any }) {

    const size = useResponsiveIconSize()
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const handleUrlClick = (link: any) => {
        if (link) {
            window.open(link, '_blank');
        }
    };
    return (
        <>
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-50 text-[11px]">
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell w-12 text-center">
                {actualIndex}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell w-24">
                {data.users_id || '--'}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell-strong max-w-[120px] truncate" title={data.users && data.users.length > 0 ? data.users[0].fname + " " + data.users[0].lname : '--'}>
                {data.users && data.users.length > 0 ? data.users[0].fname + " " + data.users[0].lname : '--'}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell max-w-[150px] truncate" title={data.users && data.users.length > 0 ? data.users[0].email : '--'}>
                {data.users && data.users.length > 0 ? data.users[0].email : '--'}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell-strong max-w-[120px] truncate" title={data.PrimaryArtist || '--'}>
                {data.PrimaryArtist || '--'}
            </td>
            <td className="px-2 py-2.5 whitespace-nowrap text-center w-10">
                <div className="flex justify-center">
                    {data.InstagramId ? (
                        <GrInstagram 
                            size={14} 
                            className="text-[#E1306C] cursor-pointer hover:scale-110 transition-transform" 
                            onClick={() => handleUrlClick(data.InstagramId)} 
                        />
                    ) : (
                        <GrInstagram size={14} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-2 py-2.5 whitespace-nowrap text-center w-10">
                <div className="flex justify-center">
                    {data.FacebookId ? (
                        <FaFacebookSquare 
                            size={14} 
                            className="text-[#1877F2] cursor-pointer hover:scale-110 transition-transform" 
                            onClick={() => handleUrlClick(data.FacebookId)} 
                        />
                    ) : (
                        <FaFacebookSquare size={14} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-2 py-2.5 whitespace-nowrap text-center w-10">
                <div className="flex justify-center">
                    {data.SpotifyId ? (
                        <FaSpotify 
                            size={16} 
                            className="text-[#1DB954] cursor-pointer hover:scale-110 transition-transform" 
                            onClick={() => handleUrlClick(data.SpotifyId)} 
                        />
                    ) : (
                        <FaSpotify size={16} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-2 py-2.5 whitespace-nowrap text-center w-10">
                <div className="flex justify-center">
                    {data.AppleId ? (
                        <SiApplemusic 
                            size={14} 
                            className="text-[#FC3C44] cursor-pointer hover:scale-110 transition-transform" 
                            onClick={() => handleUrlClick(data.AppleId)} 
                        />
                    ) : (
                        <SiApplemusic size={14} className="text-gray-200" />
                    )}
                </div>
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap text-center w-24">
                <div className="flex justify-center items-center gap-1.5">
                    <EditAdminManageArtist data={data} />
                    <button className="p-1 rounded bg-white border border-gray-200 text-red-500 hover:bg-red-50 transition-all shadow-sm group">
                        <FiTrash2 size={14} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap text-center typo-table-cell w-32">
                {data.createdAt ? (() => {
                    const date = new Date(data.createdAt);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    let hours = date.getHours();
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    return (
                        <div className="flex flex-col leading-tight items-center">
                            <span className="font-semibold text-[10px]">{`${day}/${month}/${year}`}</span>
                            <span className="text-[9px] opacity-70">{`${hours}:${minutes} ${ampm}`}</span>
                        </div>
                    );
                })() : '--'}
            </td>
        </tr>
        </>
    )
}