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
import { useForm } from "react-hook-form"
import InputUrl from "../../ui/InputUrl"

interface PlayListUrl {
    url: string
}


export default function AdminHome() {

    const size = useResponsiveIconSize();
    const navigate = useNavigate();

    let catalogs: any[] = []
    let labels: any[] = []

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors }
    } = useForm<PlayListUrl>({})


    //pending catalogs
    //pending labels

    return (
        <>
            <div className="flex flex-col sm:flex-row h-[90%] p-4 gap-6">

                {/* Latest Playlists */}
                <div className="flex flex-col gap-1 sm:w-[60%] h-2/3 sm:h-full">
                    <div className="bg-black px-4 py-2">
                        <p className="text-white mb-0 text-lg font-semibold">Latest Playlists</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 h-full bg-zinc-500">
                        <div className="w-full sm:w-[50%] overflow-y-auto">
                            <div className="flex flex-col p-2 gap-3">
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />

                            </div>

                        </div>
                        <div className="w-full sm:w-[50%] overflow-y-auto">
                            <div className="flex flex-col p-2 gap-3">
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />
                                <InputUrl />
                            </div>
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
                                <p className="mb-0">Catalogs</p>
                            </div>
                        </div>

                        <div className="h-60 overflow-y-auto">
                            {catalogs?.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No Catalogs found.</p>
                                </div>
                            ) : (
                                catalogs?.map((name: any) => (
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

                    {/* Labels */}
                    <div className="rounded-sm shadow-lg flex flex-col border border-gray-300 w-full  bg-white mb-4 py-2 px-2 ">
                        <div className="flex items-center justify-between gap-3 border-b border-gray-300 py-2 px-2">
                            <div className="flex items-center">
                                <IoIosStats size={22} />
                                <p className="mb-0 ml-2">Labels</p>
                            </div>
                            
                        </div>

                        <div className="h-32 overflow-y-auto">
                            {labels?.length === 0 ? (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500">No Labels available.</p>
                                </div>
                            ) : (
                                <>
                                    {labels?.map((name: any) => (
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

