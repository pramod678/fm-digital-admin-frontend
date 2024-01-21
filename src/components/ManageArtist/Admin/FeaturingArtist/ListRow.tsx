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
                    {data.FeaturingArtist || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.SpotifyId ? <FaSpotify size={size} onClick={() => handleUrlClick(data.SpotifyId)} /> : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.AppleId ? <SiApplemusic size={size} onClick={() => handleUrlClick(data.SpotifyId)} /> : '--'}
                </td>
                <EditAdminFeatureArtist Initialdata={data} />
            </tr>
        </>
    )
}