import * as React from "react";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import EditAdminFeatureArtist from "../PopUps/EditAdminFeatureArtist";


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
            <td className="px-3 py-2.5 whitespace-nowrap typo-table-cell-strong max-w-[120px] truncate" title={data.FeaturingArtist || '--'}>
                {data.FeaturingArtist || '--'}
            </td>
            <td className="px-3 py-2.5 whitespace-nowrap text-center w-12">
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
            <td className="px-3 py-2.5 whitespace-nowrap text-center w-12">
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
                <div className="flex justify-center items-center gap-2">
                    <EditAdminFeatureArtist Initialdata={data} />
                </div>
            </td>
        </tr>
        </>
    )
}