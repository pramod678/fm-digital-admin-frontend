import * as React from "react";
import GetDate from "../../../../utility/GetDate";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import { UpdateProfileLinkingPostApi } from "../../../../api/profileLinking";



export default function ListRow({ link, index, currentPage, PAGE_SIZE }: { link: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };
    const size = useResponsiveIconSize()
    const { mutate: UpdateProfileLinkingPost } = UpdateProfileLinkingPostApi()

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
                    {actualIndex + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {link?.users[0]?.fname + " " + link?.users[0]?.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {link?.users[0]?.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.Selectrelease || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.SelectAudio || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.ArtistName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer" onClick={() => handleUrlClick(link.FecebookLink)}>
                    <FaFacebookSquare size={size}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer" onClick={() => handleUrlClick(link.InstagramLink)}>
                    <GrInstagram size={size} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {link.createdAt ? GetDate(link.createdAt) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {statusButton(link.Status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex gap-3 p-1">
                        <button
                            type="button"
                            className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateProfileLinkingPost({ users_id: link.users_id, profileLinking_id: link.profileLinking_id, "Status": 4 })
                            }}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                                UpdateProfileLinkingPost({ users_id: link.users_id, profileLinking_id: link.profileLinking_id, "Status": 2 })
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