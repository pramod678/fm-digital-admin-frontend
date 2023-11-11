import * as React from "react";
import GetDate from "../../../utility/GetDate";



export default function ListRow({ link, index }: { link: any, index: any }) {

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.Selectrelease || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.SelectAudio || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.Selectplatform || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.FecebookLink || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.InstagramLink || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.status || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.createdAt ? GetDate(link.createdAt) : '--'}
                </td>
            </tr>
        </>
    )
}