import * as React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function ManageCatalogsListRow({ catalog, index }: { catalog: any, index: any }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <tr onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.title || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {catalog.userId || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.userName || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.email || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.label || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.numberOfTracks || '--'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer">
                    {catalog.releaseDate ? catalog.releaseDate : '--'}
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
                        <div className="px-6 py-4 grid grid-cols-3 gap-16">
                            {/* Your accordion content goes here */}
                            <div>
                                <div className="flex items-center justify-between  mb-1 mb-1">
                                    <p className="font-semibold  sm:text-sm">Release Type:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Release Title:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>

                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">Primary Artist:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Apple Id:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold  sm:text-sm">Spotify Id:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between mt-6 mb-1">
                                    <p className="font-semibold  sm:text-sm">Genre:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Sub Genre:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">PLine:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">CLine:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">UPC/EAN:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Cat No. :</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Track Version</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Instrumental:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Song Title:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Version/SubTitle:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Primary Artist:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Featuring Artist:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Author:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Composer:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Producer:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Publisher:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">ISRC:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Genre:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Sub Genre:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Price Tier:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Explicit Version:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Track Title Language:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Lyrics Language:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex flex-col mb-1">
                                    <p className="font-semibold text-sm mb-1">Lyrics:</p>
                                    <div className=" h-32 border-2 border-black p-1 overflow-hidden">
                                        <p className="whitespace-normal">
                                            ihaidhfihihihihaidhhcackkkkkkkkkkkkkkkkkkpijppppaaaaaaaaaaaaijhiiiiiiiiiiiasssssssssssssssssssss
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Caller Tune Timing:</p>
                                    <p className="text-sm">ojolj</p>
                                </div>
                                <div className="flex items-center justify-between  mb-1">
                                    <p className="font-semibold  sm:text-sm">Distribute Music Video:</p>
                                    <p className="text-sm">ojolj</p>
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
                        <Link to={`/ManageUser/Labels`}>
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