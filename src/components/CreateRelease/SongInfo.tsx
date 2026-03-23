import * as React from "react";
import AppHeader from "../SharedLayout/AppHeader";
import CreateReleaseTabs from "./CreateReleaseTabs";
import SongDetails from "./PopUps/SongDetails";
import { useNavigate } from "react-router-dom";
import { DeleteSongApi, GetReleaseInfoApi, GetSongsApi, UserDataApi } from "../../api/releaseInfo";
import { RiEditLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import InlineSongForm from "./InlineSongForm";
import cogoToast from "@successtar/cogo-toast";
import { BounceLoader } from "react-spinners";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react';


export default function SongInfo() {

    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { mutate: getUserData } = UserDataApi(setUserData, navigate)
    const { data: getReleaseInfo } = GetReleaseInfoApi(userData?.users_id)
    const { data: GetSongs, isLoading, isFetching, refetch } = GetSongsApi(getReleaseInfo?.data?.data?.releseInfo_id)
    const { mutate: DeleteSong } = DeleteSongApi(navigate, refetch)

    // Edit modal state
    const [editingSong, setEditingSong] = React.useState<any>(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const releaseType = getReleaseInfo?.data?.data?.ReleaseType;
    const songs = GetSongs?.data?.data || [];

    // Song limit logic
    const getMaxSongs = () => {
        if (releaseType === "Single") return 1;
        if (releaseType === "EP") return 4;
        return Infinity; // Album — no upper limit
    };

    const getMinSongs = () => {
        if (releaseType === "Single") return 1;
        if (releaseType === "EP") return 2;
        return 5; // Album
    };

    const canAddMore = songs.length < getMaxSongs();

    const handleCheckSongs = () => {
        const min = getMinSongs();
        const max = getMaxSongs();

        if (songs.length < min) {
            if (releaseType === "Single") {
                cogoToast.info("Please upload exactly 1 song for a Single release");
            } else if (releaseType === "EP") {
                cogoToast.info("EP requires at least 2 songs");
            } else {
                cogoToast.info("Album requires at least 5 songs");
            }
            return;
        }

        if (songs.length > max) {
            cogoToast.info(`${releaseType} allows a maximum of ${max} songs`);
            return;
        }

        navigate('/ReleaseInfo/Platform');
    }

    const openEditModal = (song: any) => {
        setEditingSong(song);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setEditingSong(null);
    };


    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            
            <AppHeader title="Create Audio Release" />

            {/* Tabs / Stepper */}
            <CreateReleaseTabs activeTab="Song Info" />

            <div className="max-w-7xl mx-auto px-4 mt-6">

                {/* Release type indicator */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Songs</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {releaseType === "Single" && "Single release — 1 song required"}
                            {releaseType === "EP" && `EP release — 2 to 4 songs (${songs.length}/4 added)`}
                            {releaseType === "Album" && `Album release — minimum 5 songs (${songs.length} added)`}
                        </p>
                    </div>
                    {canAddMore && (
                        <SongDetails userData={userData} getReleaseInfo={getReleaseInfo} GetSongs={GetSongs} refetch={refetch} />
                    )}
                </div>

                {/* Songs Table */}
                {songs.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-12">#</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Song Title</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Audio</th>
                                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map((song: any, i: number) => (
                                    <tr key={song.songsInfo_id || i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">{i + 1}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-900">{song.Title || "Untitled"}</span>
                                            {song.VersionSubtitle && (
                                                <span className="text-xs text-gray-400 ml-2">({song.VersionSubtitle})</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {song.AudioDocument ? (
                                                <audio controls className="h-8 w-full max-w-xs outline-none">
                                                    <source src={`https://api.fmdigitalofficial.com/${song.AudioDocument}`} />
                                                </audio>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">No audio</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(song)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                    title="Edit Song"
                                                >
                                                    <RiEditLine size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => DeleteSong(song?.songsInfo_id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Delete Song"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty state */}
                {songs.length === 0 && !isLoading && !isFetching && (
                    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg">
                        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                        <p className="text-sm text-gray-500 font-medium">No songs added yet</p>
                        <p className="text-xs text-gray-400 mt-1">Click "Add Song Details" to get started</p>
                    </div>
                )}
            </div>

            {/* Save & Next */}
            <div className="max-w-7xl mx-auto flex justify-end mt-6 px-4 pb-8">
                <button 
                   onClick={handleCheckSongs} 
                   className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition shadow-sm text-sm font-medium"
                >
                    Save & Next <AiOutlineArrowRight size={18} />
                </button>
            </div>

            {/* Edit Song Modal */}
            <Transition appear show={isEditOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeEditModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                    Edit Song Details
                                </Dialog.Title>
                                {editingSong && (
                                    <InlineSongForm
                                        userData={userData}
                                        getReleaseInfo={getReleaseInfo}
                                        song={editingSong}
                                        refetch={() => { refetch(); closeEditModal(); }}
                                    />
                                )}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}