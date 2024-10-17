import * as React from "react";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteSongApi, GetReleaseInfoApi, GetReleaseInfoByIdApi, GetSongsApi, UserDataApi } from "../../api/releaseInfo";
import { MdDelete } from "react-icons/md";
import cogoToast from "@successtar/cogo-toast";
import { BounceLoader } from "react-spinners";
import EditSongDetails from "../CreateRelease/PopUps/EditSongDetails";
import SongDetails from "../CreateRelease/PopUps/SongDetails";


export default function EditSongsInfo() {

    const size = useResponsiveIconSize();
    const { id } = useParams();
    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: getReleaseInfo, isLoading: isLoadingReleaseInfo } = GetReleaseInfoByIdApi(id)
    const { data: GetSongs, isLoading, isFetching, refetch } = GetSongsApi(getReleaseInfo?.data?.data?.releseInfo_id)
    const { mutate: DeleteSong, isLoading: isLoadingDeleteSong } = DeleteSongApi(navigate, refetch)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const tabs = [
        { name: 'Release Info', route: `/ReleseInfoUpdate/${id}` },
        { name: 'Song Info', route: `/Songsinfo/${id}` },
        { name: 'Platform', route: `/Platform/${id}` },
        { name: 'Submission', route: `/Submission/${id}` },
    ]

    const handleCheckSongs = () => {
        if (getReleaseInfo?.data?.data?.ReleaseType == "Single" && GetSongs?.data?.data?.length == 0) {
            cogoToast.info("please upload atleast one song")
            return
        }
        if ((getReleaseInfo?.data?.data?.ReleaseType == "EP" || getReleaseInfo?.data?.data?.ReleaseType == "Album" || getReleaseInfo?.data?.data?.ReleaseType == "Compilation") && GetSongs?.data?.data?.length < 2) {
            cogoToast.info("please upload atleast two songs")
            return
        }
        navigate(`/Platform/${getReleaseInfo?.data?.data.releseInfo_id}`);
    }


    return (
        <>
            {(isLoading || isFetching || isLoadingReleaseInfo) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        // <Link to={`${r?.route}`}>
                        <button
                            key={index}
                            type="button"
                            onClick={() => navigate(`${r.route}`)}
                            className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Song Info" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                        >
                            {r.name}
                        </button>
                        // </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-4">
                {
                    GetSongs?.data?.data?.map((song: any, i: any) => {
                        return (
                            <div key={i} className="flex items-center w-[90%] md:w-[60%] justify-between bg-gray-200 p-2 mb-2 rounded-md">
                                <div className="flex items-center w-[80%] justify-between">
                                    <div className="flex gap-2 md:gap-4 items-center mr-2 md:mr-0">
                                        <p className="font-semibold">{i + 1}.</p>
                                        <p className="font-semibold text-lg">{song?.Title}</p>
                                    </div>
                                    <audio controls className="outline-none h-8 w-full md:w-64">
                                        <source src={`https://api.fmdigitalofficial.com/${song?.AudioDocument}`} />
                                        Your browser does not support the audio tag.
                                    </audio>
                                </div>
                                <div className="flex items-center gap-2 md:gap-4   md:w-[20%] justify-center">
                                    <EditSongDetails userData={userData} getReleaseInfo={getReleaseInfo} song={song} refetch={refetch} />
                                    <button type="button" className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => DeleteSong(song?.songsInfo_id)}>
                                        <MdDelete size={size} />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


            <div className="p-4 space-y-4">

                <SongDetails userData={userData} getReleaseInfo={getReleaseInfo} GetSongs={GetSongs} refetch={refetch} />
            </div>

            <button onClick={handleCheckSongs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4">
                Save and Next
            </button>



        </>
    )
}