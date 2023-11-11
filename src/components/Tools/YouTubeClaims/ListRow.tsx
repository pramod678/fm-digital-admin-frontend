import * as React from "react";
import GetDate from "../../../utility/GetDate";



export default function ListRow({ claim, index }: { claim: any, index: any }) {
   
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.Selectrelease || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.SelectAudio || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.SelectPolicy || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.Label || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.createdAt ? GetDate(claim.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.PasteURL || '--'}
                </td>
            </tr>
        </>
    )
}