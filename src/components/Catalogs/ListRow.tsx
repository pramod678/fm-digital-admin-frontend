import * as React from "react";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { RiDraftFill } from "react-icons/ri";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { BiCheck } from "react-icons/bi";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import GetDate from "../../utility/GetDate";
import { MdBookmarks, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DeleteCatalogApi } from "../../api/catalogs";

export default function ListRow({ catalog, index }: { catalog: any, index: any }) {
    const size = useResponsiveIconSize();
    const navigate = useNavigate()

    console.log(catalog?.releseInfo_id, "catalog?.releseInfo_id ")

    const { mutate: DeleteCatalog, isLoading: isLoadingDeleteCatalog } = DeleteCatalogApi({ id: catalog?.releseInfo_id })


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
                    <>
                        <div className="flex items-center gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#0000cd] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none flex items-center"
                            >
                                <span className="mr-2 text-white font-semibold">Draft</span>
                            </button>
                            <span onClick={DeleteCatalog} className="cursor-pointer">
                                <MdDelete color="red" size={20} />
                            </span>
                        </div>
                    </>
                );
            case 1:
                return (
                    <button type="button" className="px-4 py-2 bg-neutral-600 text-xs text-white text-base rounded hover:bg-neutral-700 focus:outline-none flex items-center">
                        ........
                    </button>
                );
            case 2:
                return (
                    <button type="button" className="px-4 py-2 bg-neutral-600 text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none flex items-center">
                        Reject
                    </button>
                );
            case 3:
                return (
                    <div className="flex items-center gap-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0000cd] text-xs text-white text-base rounded hover:bg-neutral-600 focus:outline-none flex items-center"
                        >
                            <span className="mr-2 text-white font-semibold">Draft</span>
                        </button>
                        <span onClick={DeleteCatalog} className="cursor-pointer">
                            <MdDelete color="red" size={20} />
                        </span>

                    </div>
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
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {index + 1}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    <div className="w-full flex justify-center">
                        {iconSelector(catalog.Status)}
                    </div>
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
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
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.Title || '--'}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.ArtistName || '--'}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.Genre || '--'}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.Label || '--'}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.Tracks || '--'}
                </td>
                <td onClick={() => navigate(`/ReleseInfoUpdate/${catalog?.releseInfo_id}`)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
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