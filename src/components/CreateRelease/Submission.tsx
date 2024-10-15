import * as React from "react";
import SongDetails from "./PopUps/SongDetails";
import { MdClear } from "react-icons/md"
import { AiFillSave, AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetReleaseInfoApi, GetSubmissionsApi, SubmissionPostApi, UserDataApi } from "../../api/releaseInfo";


export default function Submission() {

    const [userIagery, setUserIagery] = React.useState(false);
    const size = useResponsiveIconSize();
    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: getRelease } = GetReleaseInfoApi(userData?.users_id)
    const { data: getSubmissions } = GetSubmissionsApi(getRelease?.data?.data?.releseInfo_id)
    const { mutate: SubmissionPost, isLoading: isLoadingSubmissionPost } = SubmissionPostApi(navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]

    const handleSubmit = () => {
        let formData: any = {
            releseInfo_id: getSubmissions?.data?.data?.releseInfo_id,
            Status: 1,
            users_id: parseInt(getSubmissions?.data?.data?.users_id),
            userIagery: userIagery,
        }
        SubmissionPost(formData)
    }


    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        // <Link to={`/${r.route}`}>
                        <button
                            key={index}
                            type="button"
                            className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Submission" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                        >
                            {r.name}
                        </button>
                        // </Link>
                    ))}
                </div>

            </div>

            <p className="text-left font-semibold mt-4 text-lg ml-8">Release Information</p>
            <div className="flex flex-col sm:flex-row items-center justify-between ml-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 w-full sm:w-1/2">
                    <div className="flex flex-col w-full sm:mr-4">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md">Title</p>
                            <p className="text-sm">{getSubmissions?.data?.data?.Title}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md">Artist</p>
                            <p className="text-sm">{getSubmissions?.data?.data?.Artist}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md">Label</p>
                            <p className="text-sm">{getSubmissions?.data?.data?.Label}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-full sm:ml-4">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md">Genre</p>
                            <p className="text-sm">{getRelease?.data?.data?.Genre}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md">Subgenre</p>
                            <p className="text-sm">{getRelease?.data?.data?.SubGenre || "---"}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold  sm:text-md"># of songs</p>
                            <p className="text-sm">{getRelease?.data?.data?.Songs || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 flex justify-center mt-8 sm:mt-0">
                    <img
                        className="w-32 h-32 object-cover rounded"
                        src={`https://api.fmdigitalofficial.com/${getRelease?.data?.data?.ImageDocument}`}
                        alt="Art Work"
                    />
                </div>
            </div>

            <div className="flex w-full justify-end ">
                <button
                    className="flex items-center mr-[270px] mt-6 font-semibold text-sm justify-center ml-2 py-2 px-4 bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 mb-4 rounded-md"
                    onClick={() => navigate(`/ReleseInfoUpdate/${getSubmissions?.data?.data?.releseInfo_id}`)}
                >
                    {/* < size={size} /> */}
                    Edit Details
                </button>
            </div>



            <div className="flex flex-wrap items-center justify-center gap-2 mt-24">
                <input
                    type="checkbox"
                    onChange={(event) => setUserIagery(event.target.checked)}
                />

                <label>I understand and agree to the </label> <a href="/">FM Digital Distribution Terms & Privacy Policy.</a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className={`px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center ${userIagery ? '' : 'cursor-not-allowed'}`}
                    disabled={!userIagery}
                >
                    <span className="mr-2">Submit</span>
                    <AiFillSave />
                </button>
            </div>


        </>
    )
}