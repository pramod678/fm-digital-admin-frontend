import * as React from "react";
import SongDetails from "./PopUps/SongDetails";
import { MdClear } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetSubmissionsApi, UserDataApi } from "../../api/releaseInfo";


export default function Submission() {

    const [AudioDocument, setAudioDocument] = React.useState({ preview: "", data: "" });
    const size = useResponsiveIconSize();
    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: getSubmissions } = GetSubmissionsApi(userData?.users_id)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]


    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        <Link to={`/${r.route}`}>
                            <button
                                key={index}
                                type="button"
                                className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Submission" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                            >
                                {r.name}
                            </button>
                        </Link>
                    ))}
                </div>

            </div>

            <p className="text-left font-semibold mt-4 text-lg ml-4">Release Information</p>
            <div className="flex">
                <div className="flex flex-col w-1/2 p-4">
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm">Title</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.Title}</p>
                    </div>
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm">Artist</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.Artist}</p>
                    </div>
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm">Label</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.Label}</p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 p-4">
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm">Genre</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.Genre}</p>
                    </div>
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm">Subgenre</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.SubGenre}</p>
                    </div>
                    <div className="flex item-center justify-between w-1/2">
                        <p className="font-semibold sm:text-base text-sm"># of songs</p>
                        <p className=" sm:text-base text-sm">{getSubmissions?.data?.data?.Songs}</p>
                    </div>
                </div>
                <img style={{ height: 146, width: 145 }}
                    src={`https://fmdigitalofficial.in/${getSubmissions?.data?.data?.ImageDocument}`}
                    alt="Art Work"
                ></img>
            </div>
            
        </>
    )
}