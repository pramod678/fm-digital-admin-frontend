import { FaCircleInfo } from "react-icons/fa6"
import { FaRegCircleDot } from "react-icons/fa6"
import { GrEdit } from "react-icons/gr"
import { IoIosStats } from "react-icons/io"
import { BiRefresh } from "react-icons/bi"
import { TbDatabaseDollar } from 'react-icons/tb'
import { BsCurrencyDollar } from 'react-icons/bs'
import * as React from "react"

export default function UserHome({ userData }: { userData: any }) {

    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in";
    };

    const Spotifycards = [1];

    const YoutubeCards = [1];


    return (
        <>
            <div className="flex flex-col sm:flex-row h-[90%] p-4 gap-6">

                {/* Latest Playlists */}
                <div className="flex flex-col gap-1 sm:w-[60%] h-2/3 sm:h-full">
                    <div className="bg-black px-4 py-2">
                        <p className="text-white mb-0 text-lg font-semibold">Latest Playlists</p>
                    </div>
                    <div className="flex h-full bg-gray-500">
                        <div className="w-[40%] sm:w-[30%]  overflow-y-auto">
                            <img src="./images/deathrow.jpg" alt="" className="w-full h-52 sm:h-60 object-fit p-1" />
                            <img src="./images/deathrow.jpg" alt="" className="w-full h-52 sm:h-60  object-fit p-1" />
                            <img src="./images/deathrow.jpg" alt="" className="w-full h-52 sm:h-60  object-fit p-1" />
                        </div>
                        <div className="w-[60%] sm:w-[70%] overflow-y-auto">
                            <img src="./images/12thFail.jpeg" alt="" className="w-full h-52 sm:h-80 object-fit p-1" />
                            <img src="./images/12thFail.jpeg" alt="" className="w-full h-52 sm:h-80 object-fit p-1" />
                            <img src="./images/12thFail.jpeg" alt="" className="w-full h-52 sm:h-80 object-fit p-1" />
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
                                <p className="mb-0">Connection requested</p>
                            </div>
                        </div>

                        <div className="h-60 overflow-y-auto">
                            {['Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla', 'Raju Gangitla'].map(name => (
                                <div className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full ">
                                    <div className="flex items-center gap-4">
                                        <FaRegCircleDot size={15} />

                                        <div className="flex flex-col ">
                                            <p className="text-blue-500 text-sm mb-0">{name}</p>
                                            <p className="text-gray-500 text-xs mb-0">Date Created 17 Feb 1521</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <GrEdit size={18} />
                                    </div>
                                </div>
                            ))}
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
                            {['Raju Gangitla', 'Raju Gangitla',].map(name => (
                                <div className="px-2 py-2 border-b border-gray-300 flex justify-between items-center w-full">
                                    <div className="flex items-center gap-4">
                                        <FaRegCircleDot size={15} />

                                        <div className="flex flex-col ">
                                            <p className="text-blue-500 text-sm mb-0">{name}</p>
                                            <p className="text-gray-500 text-xs mb-0">Date Created 17 Feb 1521</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <GrEdit size={18} />
                                    </div>
                                </div>
                            ))}


                            <button className="items-start border border-gray-500 mt-2 mx-auto px-2">
                                <span>+</span>
                                More
                            </button>
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
                            <span className="flex items-center gap-1 py-1"><BsCurrencyDollar color={'#ffffff'} /> 0.00  </span>
                        </button>
                    </div>
                </div>

            </div>


        </>
    );
}

