import * as React from "react";
import Edit from "../PopUps/EditManageArtist";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSpotify } from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";


export default function ListRow({ data, index }: { data: any, index: any }) {

    const size = useResponsiveIconSize()

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.artistId || '--'} */}
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {data.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.PrimaryArtist || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.InstagramId || '--'} */}
                    <GrInstagram size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.FacebookId || '--'} */}
                    <FaFacebookSquare size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.SpotifyId || '--'} */}
                    <FaSpotify size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {data.AppleId || '--'} */}
                    <SiApplemusic size={size} />
                </td>
                <Edit data={data} />
            </tr>
        </>
    )
}