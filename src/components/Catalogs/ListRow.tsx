import * as React from "react";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { RiDraftFill } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { BiCheck } from "react-icons/bi";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import GetDate from "../../utility/GetDate";
import { MdBookmarks, MdDelete } from "react-icons/md";

export default function ListRow({ catalog, index }: { catalog: any, index: any }) {
    const size = useResponsiveIconSize();
    const iconSelector = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <p style={{ color: "black" }}>
                        <MdBookmarks size={size} />
                    </p>
                );
            case 1:
                return (
                    <p style={{ color: "#808080" }}>
                        <BsClock size={size} />
                    </p>
                );
            case 2:
                return (
                    <p style={{ color: "#add8e6" }}>
                        <FcCancel size={size} />
                    </p>
                );
            case 3:
                return (
                    <p style={{ color: "#0000cd" }}>
                        <VscGitPullRequestNewChanges size={size} />
                    </p>
                );
            case 4:
                return (
                    <p style={{ color: "green" }}>
                        <BsCheckCircle size={size} />
                    </p>
                );
            default:
                return <></>;
        }
    };

    const statusButton = (status: any) => {
        switch (status) {
            case 0:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-xs text-white text-base rounded hover:bg-red-600 focus:outline-none flex items-center"
                    >
                        <span className="mr-2 text-white font-semibold">Delete</span>
                    </button>  
                );
            case 1:
                return (
                   '--'
                );
            case 2:
                return (
                    <p style={{ color: "#add8e6" }}>
                        <FcCancel size={size} />
                    </p>
                );
            case 3:
                return (
                    <p style={{ color: "#0000cd" }}>
                        <VscGitPullRequestNewChanges size={size} />
                    </p>
                );
            case 4:
                return (
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-500 text-xs text-white text-base rounded hover:bg-cyan-600 focus:outline-none flex items-center"
                    >
                        <span className="mr-2 text-white font-semibold">Stores</span>
                    </button>
                );
            default:
                return <></>;
        }
    };
    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index+1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="w-full flex justify-center">
                        {iconSelector(catalog.Status)}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.ImageDocument ? (
                        <div className="w-full flex justify-center">
                            <img
                                src={`https://fmdigitalofficial.in/${catalog.ImageDocument}`}
                                alt="Catalog"
                                className="w-8 h-8 object-cover rounded"
                            />
                        </div>
                    ) : (
                        '--'
                    )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.Title || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.ArtistName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.Genre || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.Label || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.Tracks || '--' }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.ReleaseDate ? GetDate(catalog.ReleaseDate) : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {/* {catalog.actions || '--'} */}
                    {statusButton(catalog.Status)}
                </td>
            </tr>
        </>
    )
}