import * as React from "react";
import GetDate from "../../../utility/GetDate";
import { FaEdit } from "react-icons/fa";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import Edit from "./CreatePopup";



export default function ListRow({ claim, index, currentPage, PAGE_SIZE }: { claim: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {actualIndex}
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