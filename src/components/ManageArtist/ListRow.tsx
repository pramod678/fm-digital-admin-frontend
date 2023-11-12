import * as React from "react";
import GetDate from "../../utility/GetDate";
import { RiDraftFill } from "react-icons/ri";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link } from "react-router-dom";


export default function ListRow({ data, index }: { data: any, index: any }) {

    const size = useResponsiveIconSize();
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.artistId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.name || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.instagramId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.facebookId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.spotifyId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.appleId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <Link to={`/ManageArtist/${data.artistId}`}>
                        <RiDraftFill className="cursor-pointer" color="brown" size={size} />
                    </Link>
                </td>
            </tr>
        </>
    )
}