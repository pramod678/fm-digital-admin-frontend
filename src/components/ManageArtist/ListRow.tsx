import * as React from "react";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import Edit from "./PopUps/EditManageArtist";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";

export default function ListRow({ data, index }: { data: any, index: any }) {

    const size = useResponsiveIconSize();
    const handleUrlClick = (link: any) => {
        if (link) {
            window.open(link, '_blank');
        }
    };
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.artistId || '--'} */}
                    {index + 1}
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
                    {data.AppleId ? <SiApplemusic size={size} onClick={() => handleUrlClick(data.AppleId)} /> : '--'}
                </td>
                <Edit data={data} />
            </tr>
        </>
    )
}