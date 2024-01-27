import { BsCardChecklist, BsFileEarmarkText, BsPeople, BsTicket } from 'react-icons/bs';
import * as React from "react"
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import InputUrl from "../../ui/InputUrl"
import { GetDashBoardStatsApi, GetDashboardsLinksApi } from '../../api/releaseInfo';
import { BounceLoader } from 'react-spinners';
import AdminSpotifyList from './AdminSpotifyList';
import AdminYoutubeList from './AdminYoutubeList';

interface PlayListUrl {
    url: string
}


export default function AdminHome() {
    const size = useResponsiveIconSize();
    const navigate = useNavigate();
    const { data: GetDashBoardStats, isLoading, isFetching } = GetDashBoardStatsApi()

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

    const cardsData = [
        { title: 'Pending Catalogs', count: GetDashBoardStats?.data?.data?.pendingRelese || 0, icon: <BsFileEarmarkText className="text-5xl text-blue-500 mb-4" />, color: 'blue', route:'/Catalogs' },
        { title: 'Pending Labels', count: GetDashBoardStats?.data?.data?.pendingLabel || 0, icon: < BsCardChecklist className="text-5xl text-green-500 mb-4" />, color: 'green', route: '/Label' },
        { title: 'Total Artists', count: GetDashBoardStats?.data?.data?.pendingTickets || 0, icon: < BsPeople className="text-5xl text-purple-500 mb-4" />, color: 'purple', route: '/ManageArtist' },
        { title: 'Pending Tickets', count: GetDashBoardStats?.data?.data?.totalArtist || 0, icon: < BsTicket className="text-5xl text-red-500 mb-4" />, color: 'red', route: '/Tickets' },
    ];
    //pending catalogs
    //pending labels

    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="flex flex-col sm:flex-row h-[90%] p-4 gap-6">
                {/* Latest Playlists */}
                <div className="flex flex-col gap-1 sm:w-[60%] h-2/3 sm:h-full">
                    <div className="bg-black px-4 py-2">
                        <p className="text-white mb-0 text-lg font-semibold">Latest Playlists</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 h-full bg-zinc-500">
                        <div className="w-full sm:w-[50%] overflow-y-auto">
                            <div className="flex flex-col p-2 gap-3">
                                <AdminSpotifyList />
                            </div>

                        </div>
                        <div className="w-full sm:w-[50%] overflow-y-auto">
                            <div className="flex flex-col p-2 gap-3">
                                <AdminYoutubeList />
                            </div>
                        </div>
                    </div>
                </div>

                {/* create 4 cards for pending catalogs, labels, artists, tickets, */}
                <div className="grid grid-cols-2 gap-6 sm:w-[40%]">
                    {cardsData.map((card, index) => (
                        <Link to={`${card.route}`}>
                            <div style={{ borderColor: `${card.color}` }} className={`bg-gray-100 border-b-4 cursor-pointer rounded-md p-6 shadow-full flex flex-col hover:bg-gray-200 justify-center items-center`}>
                                {card.icon}
                                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                                <p style={{ color: `${card.color}` }} className={`text-${card.color}-600 text-3xl font-bold`}>{`${card.count} `}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


        </>
    );
}

