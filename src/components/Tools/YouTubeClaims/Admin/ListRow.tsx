import * as React from "react";
import GetDate from "../../../../utility/GetDate";
import { IoLogoYoutube } from "react-icons/io5";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import { UpdateYoutubeClaimsApi } from "../../../../api/youtubeClaims";




export default function ListRow({ claim, index, currentPage, PAGE_SIZE }: { claim: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;

    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };
    const { mutate: UpdateYoutubeClaims } = UpdateYoutubeClaimsApi()

    const size = useResponsiveIconSize()
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
                    {claim.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {claim?.users[0]?.fname + " " + claim?.users[0]?.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {claim?.users[0]?.email || '--'}
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
                    {claim.createdAt ? GetDate(claim.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => handleUrlClick(claim.PasteURL)}>
                    <IoLogoYoutube size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {statusButton(claim.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateYoutubeClaims({ users_id: claim.users_id, youtubeClaims_id: claim.youtubeClaims_id, "Status": 4 })
                            }}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateYoutubeClaims({ users_id: claim.users_id, youtubeClaims_id: claim.youtubeClaims_id, "Status": 2 })
                            }}
                        >
                            Reject
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}