import { FaCircleInfo } from "react-icons/fa6"
import { FaRegCircleDot } from "react-icons/fa6"
import { GrEdit } from "react-icons/gr"
import { IoIosStats } from "react-icons/io"
import { BiRefresh } from "react-icons/bi"
import { TbDatabaseDollar } from 'react-icons/tb'
import { BsCurrencyDollar } from 'react-icons/bs'
import * as React from "react"
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize"
import { Link, useNavigate } from "react-router-dom"
import { GetLatestCoorectionsApi, GetLatestDraftsApi } from "../../api/releaseInfo"

export default function UserHome({ userData }: { userData: any }) {

    const size = useResponsiveIconSize();
    const navigate = useNavigate();

    const { data: GetLatestDrafts, isLoading: isLoadingGetLatestDrafts } = GetLatestDraftsApi(userData?.users_id)

    const { data: GetLatestCoorections, isLoading } = GetLatestCoorectionsApi(userData?.users_id)

    
    return (
        <>
            <div className="flex flex-col sm:flex-row h-[90%] p-4 gap-6">

                {/* Latest Playlists */}
                <div className="flex flex-col gap-1 sm:w-[60%] h-2/3 sm:h-full">
                    <div className="bg-black px-4 py-2">
                        <p className="text-white mb-0 text-lg font-semibold">Latest Playlists</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 h-full bg-gray-500">
                        <div className="w-full sm:w-[30%] overflow-y-auto">
                            <iframe src="https://open.spotify.com/embed/track/4Q1pRLjLK7PQeCV3DQ9P6A?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                            <iframe src="https://open.spotify.com/embed/track/4GeHXCwcvz1LKszU3TnQvf?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                            <iframe src="https://open.spotify.com/embed/track/1JUbvTiGqLUgrPj5vMOlKU?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                            <iframe src="https://open.spotify.com/embed/track/7yLqwZe6gvG0Lr1Tdbojw7?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                            <iframe src="https://open.spotify.com/embed/track/3PkxDIO67YHMYRdJv7bf9V?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                        </div>
                        <div className="w-full sm:w-[70%] overflow-y-auto">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/MW6XMllF6Ww?si=CaYyAfL7eLb_5wL7" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-full h-52 sm:h-80 object-fit p-1"  allowFullScreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/LT7_vVEuk40?si=W0_9Gyut22Q0Gpqj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-full h-52 sm:h-80 object-fit p-1"  allowFullScreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/MOItMO8pOIs?si=fE6JGXx6pK7f3EEU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-full h-52 sm:h-80 object-fit p-1"  allowFullScreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/-i9mSEBQvUw?si=H59ArXF53WE894UW" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  className="w-full h-52 sm:h-80 object-fit p-1"  allowFullScreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/0gg7XhUhSbk?si=JBD_mSU8IuOsN13-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-full h-52 sm:h-80 object-fit p-1"  allowFullScreen></iframe>
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex flex-col sm:w-[40%] mt-12 sm:mt-0">
                    {/* Connection requested */}
                    <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full bg-white py-2 px-2 mb-4">
                        <div className="flex items-center justify-start gap-2 border-b border-gray-300 py-1 px-1">
                            <div className="flex items-center">
                                <FaCircleInfo size={20} />
                            </div>
                            <div className="flex items-center">
                                <p className="mb-0">Correction requested</p>
                            </div>
                        </div>

                        <div className="h-60 overflow-y-auto">
                            {GetLatestCoorections?.data?.data?.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No Corrections found.</p>
                                </div>
                            ) : (
                                GetLatestCoorections?.data?.data?.map((name: any) => (
                                    <div key={name.releseInfo_id} className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full">
                                        <div className="flex items-center gap-4">
                                            <FaRegCircleDot size={15} />
                                            <div className="flex flex-col">
                                                <p className="text-blue-500 text-sm mb-0">{name.ReleaseTitle}</p>
                                                <p className="text-gray-500 text-xs mb-0">Date Created {name.ReleaseDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center cursor-pointer" onClick={() => navigate(`/ReleseInfoUpdate/${name?.releseInfo_id}`)}>
                                            <GrEdit size={size} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>

                    {/* Drafts */}
                    <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full  bg-white mb-4 py-2 px-2 ">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-300 py-2 px-2">
                            <div className="flex items-center">
                                <IoIosStats size={22} />
                                <p className="mb-0 ml-2">Drafts</p>
                            </div>
                            <div className="flex items-center justify-center bg-red-500 text-white rounded-sm h-6 w-6">
                                <p className="m-0 text-sm">1</p>
                            </div>

                        </div>

                        <div className="h-32 overflow-y-auto">
                            {GetLatestDrafts?.data?.data?.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-black">No drafts available.</p>
                                </div>
                            ) : (
                                <>
                                    {GetLatestDrafts?.data?.data?.map((name: any) => (
                                        <div key={name.releseInfo_id} className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full">
                                            <div className="flex items-center gap-4">
                                                <FaRegCircleDot size={15} />
                                                <div className="flex flex-col">
                                                    <p className="text-blue-500 text-sm mb-0">{name.ReleaseTitle}</p>
                                                    <p className="text-gray-500 text-xs mb-0">Date Created {name.ReleaseDate}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center cursor-pointer" onClick={() => navigate(`/ReleseInfoUpdate/${name?.releseInfo_id}`)}>
                                                <GrEdit size={size} />
                                            </div>
                                        </div>
                                    ))}
                                        <button className="items-start border border-gray-500 mt-2 mx-auto px-2" onClick={() => navigate(`/ReleseInfo`)}>
                                        <span>+</span>
                                        More
                                    </button>
                                </>
                            )}
                        </div>

                    </div>

                    {/* Payments */}
                    <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full h-auto bg-white  py-2 px-2 ">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-300 py-2 px-2">
                            <div className="flex items-center">
                                <TbDatabaseDollar size={22} />
                                <p className="mb-0 ml-2">Payments</p>
                            </div>
                            <div className="flex items-center justify-center h-6 w-6">
                                <BiRefresh size={22} />
                            </div>

                        </div>

                        <button className="items-start text-white border bg-green-400 border-gray-500 mt-2  mx-auto px-2">
                            <span className="flex items-center gap-1 py-1" onClick={() => navigate('/Financial')}>
                                <BsCurrencyDollar color={'#ffffff'} /> 0.00
                            </span>
                        </button>
                    </div>
                </div>

            </div>


        </>
    );
}

