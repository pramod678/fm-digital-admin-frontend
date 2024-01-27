import * as React from "react";
import GetDate from "../../../utility/GetDate";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import { IoLogoYoutube } from "react-icons/io";



export default function ListRow({ claim, index, currentPage, PAGE_SIZE }: { claim: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const size = useResponsiveIconSize()
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };
    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-[#9dd3fc] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Pending</span>
                        </button>
                    </>
                );
            case 1:
                return (
                    <>
                        --
                    </>
                );
            case 2:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 w-20 text-center py-2 bg-red-500 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none "
                        >
                            <span className="mr-2 text-white font-semibold">Reject</span>
                        </button>
                    </>
                );
            case 3:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#0000cd] w-20 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none"
                    >
                        <span className=" text-white text-xs font-semibold">Correct..</span>
                    </button>
                );
            case 4:
                return (
                    <>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0000cd] w-20 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none"
                        >
                            <span className=" text-white text-xs font-semibold">Approved</span>
                        </button>
                    </>
                );
            default:
                return <></>;
        }
    };
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
                    {statusButton(claim.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {claim.createdAt ? GetDate(claim.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer" onClick={() => handleUrlClick(claim.PasteURL)}>
                    <IoLogoYoutube size={size} />
                </td>
            </tr>
        </>
    )
}