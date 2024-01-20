import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function ManageCatalogsListRow({ catalog, index, currentPage, PAGE_SIZE }: { catalog: any, index: any, currentPage: any, PAGE_SIZE: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const actualIndex = (currentPage - 1) * PAGE_SIZE + index + 1;
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
                    {catalog.userData[0]?.fname + " " + catalog.userData[0]?.lname || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.userData[0]?.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.LabelName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.songInfo?.length || '--'}
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
                    <td colSpan={8} className="px-0 py-0">
                        <div className="px-6 py-4 grid sm:grid-cols-3 gap-16">
                            {/* Your accordion content goes here */}
                            <div>
                                <div className="flex items-center justify-between  mb-1 mb-1">
                                    <p className="font-semiboldtext-sm">Release Type:</p>
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
                                    <p className="text-sm">{catalog?.ReleaseType}</p>
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold text-sm">Spotify Id:</p>
                                    <p className="text-sm">{catalog?.ReleaseType}</p>
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
                                    <p className="text-sm">{catalog?.ReleaseType}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Track Version</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Trackversion}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Instrumental:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Instrumental}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Song Title:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Title}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Version/SubTitle:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.VersionSubtitle}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Primary Artist:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Primaryartist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Featuring Artist:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.FeaturingArtist}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Author:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Author}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Composer:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Composer}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Producer:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Producer}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Publisher:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Publisher}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">ISRC:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.ISRC}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Genre:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Genre}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Sub Genre:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.Subgenre}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Price Tier:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.PriceTier}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Explicit Version:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.ExplicitVersion}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Track Title Language:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.TrackTitleLanguage}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Lyrics Language:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.LyricsLanguage}</p>
                                </div>
                                <div className="flex flex-col mb-1">
                                    <p className="font-semibold text-sm mb-1">Lyrics:</p>
                                    <div className=" h-32 border-2 border-black p-1 overflow-hidden">
                                        <p className="whitespace-normal">
                                            {catalog?.songInfo[0]?.Lyrics}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Caller Tune Timing:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.CallerTuneTiming}</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold text-sm">Distribute Music Video:</p>
                                    <p className="text-sm">{catalog?.songInfo[0]?.PriceTier}</p>
                                </div>
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