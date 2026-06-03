import * as React from "react";
import { FaChevronDown, FaChevronUp, FaSpotify } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AllSongs from "../../Catalogs/AllSongs";
import { GetAdminCatalogSongsApi, GetAdminPrimaryArtistApi, GetAdminCatalogPlatformApi } from "../../../api/catalogs";
import { SiApplemusic } from "react-icons/si";


export default function ManageCatalogsListRow({ catalog, index, currentPage, PAGE_SIZE }: { catalog: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
    
    // Fetch track count
    const { data: songsData } = GetAdminCatalogSongsApi(catalog.users_id, catalog.releaseInfo_id, 1, 1);
    const trackCount = songsData?.data?.pagination?.totalItems !== undefined ? songsData.data.pagination.totalItems : '--';

    // Fetch primary artist data
    const { data: primaryArtistData } = GetAdminPrimaryArtistApi(catalog.users_id, catalog.releaseInfo_id);
    const primaryArtist = primaryArtistData?.data?.data?.[0] || catalog.primaryArtist?.[0];

    // Fetch platform data
    const { data: platformData } = GetAdminCatalogPlatformApi(catalog.users_id, catalog.releaseInfo_id);
    const selectedPlatforms = platformData?.data?.data || [];

    const handleUrlClick = (link: any) => {
        if (link) {
            window.open(link, "_blank");
        }
    };

    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {actualIndex}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.ReleaseTitle || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.users_id || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.userData ? `${catalog.userData.fname} ${catalog.userData.lname}` : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.userData?.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.LabelName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {trackCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.ReleaseDate ? catalog.ReleaseDate : '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex justify-end">
                    {isOpen ? (
                        <FaChevronUp className="text-gray-500" />
                    ) : (
                        <FaChevronDown className="text-gray-500" />
                    )}
                </td>
            </tr>
            {isOpen && (
                <tr className="w-full">
                    <td colSpan={9} className="px-0 py-0">
                        <div className="px-6 py-4 grid sm:grid-cols-3 gap-16">
                            {/* Your accordion content goes here */}
                            <div>
                                <div className="flex w-full justify-center items-center mb-4">
                                    {catalog.ImageDocument && (
                                        <img
                                            className="w-32 h-32 object-cover rounded"
                                            src={`https://api.fmdigitalofficial.com/${catalog.ImageDocument}`}
                                            alt="Art Work"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Release Type:</p>
                                    <p className="text-sm">{catalog?.ReleaseType}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Release Title:</p>
                                    <p className="text-sm">{catalog?.ReleaseTitle}</p>
                                </div>

                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold text-sm">Primary Artist:</p>
                                    <p className="text-sm">{catalog?.PrimaryArtist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Apple Id:</p>
                                    {primaryArtist?.AppleId ? (
                                        <SiApplemusic
                                            className="cursor-pointer"
                                            size={14}
                                            onClick={() =>
                                                handleUrlClick(primaryArtist.AppleId)
                                            }
                                        />
                                    ) : (
                                        "--"
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">Spotify Id:</p>
                                    {primaryArtist?.SpotifyId ? (
                                        <FaSpotify
                                            className="cursor-pointer"
                                            size={14}
                                            onClick={() =>
                                                handleUrlClick(primaryArtist.SpotifyId)
                                            }
                                        />
                                    ) : (
                                        "--"
                                    )}
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold text-sm">Genre:</p>
                                    <p className="text-sm">{catalog?.Genre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Sub Genre:</p>
                                    <p className="text-sm">{catalog?.SubGenre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">PLine:</p>
                                    <p className="text-sm">{catalog?.PLine}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">CLine:</p>
                                    <p className="text-sm">{catalog?.CLine}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">UPC/EAN:</p>
                                    <p className="text-sm">{catalog?.UPCEAN}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Cat No. :</p>
                                    <p className="text-sm">{catalog?.cat_id}</p>
                                </div>
                            </div>
                            
                            <div className="h-[300px] w-full sm:col-span-2">
                                <AllSongs data={catalog} userId={catalog?.users_id} />
                            </div>

                        </div>
                    </td>
                </tr>
            )}
            <tr className="">
                <td colSpan={10}>
                    <div className="flex w-full justify-end gap-3 p-1">
                        <button
                            type="button"
                            className="bg-pink-600 hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                            onClick={() => {
                            }}
                        >
                            Take Down Release
                        </button>
                        <Link to={`/ManageUser/Labels/${catalog.users_id}`}>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {
                                }}
                            >
                                Go to Label
                            </button>
                        </Link>
                        <Link to={`/ManageUser`}>
                            <button
                                type="button"
                                className="bg-[#00CED1] hover:bg-pink-900 text-white py-2 px-4 rounded sm:text-xs "
                                onClick={() => {
                                }}
                            >
                                User Details
                            </button>
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}