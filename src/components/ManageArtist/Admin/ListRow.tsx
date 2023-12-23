import * as React from "react";
import Edit from "../PopUps/EditManageArtist";


export default function ListRow({ data, index }: { data: any, index: any }) {

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
                    {data.InstagramId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.FacebookId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.SpotifyId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {data.AppleId || '--'}
                </td>
                <Edit data={data} />
            </tr>
        </>
    )
}