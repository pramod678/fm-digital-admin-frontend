import * as React from "react";
import Edit from "../../PopUps/EditManageArtist";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import EditAdminManageArtist from "../PopUps/EditAdminManageArtist";


export default function ListRow({ data, index, currentPage, PAGE_SIZE }: { data: any, index: any, currentPage: any, PAGE_SIZE: any }) {

    const size = useResponsiveIconSize()
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const handleUrlClick = (link: any) => {
        if (link){
            window.open(link, '_blank');
        }
    };
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.artistId || '--'} */}
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data?.users[0].fname + " " + data.users[0].lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.users[0].email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.PrimaryArtist || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.InstagramId ? <GrInstagram size={size} onClick={() => handleUrlClick(data.InstagramId)} /> : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.FacebookId ? <FaFacebookSquare size={size} onClick={() => handleUrlClick(data.FacebookId)} /> : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.SpotifyId ? <FaSpotify size={size} onClick={() => handleUrlClick(data.SpotifyId)} /> : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.AppleId ? <SiApplemusic size={size} onClick={() => handleUrlClick(data.SpotifyId)} /> : '--'}
                </td>
                <EditAdminManageArtist data={data} />
            </tr>
        </>
    )
}