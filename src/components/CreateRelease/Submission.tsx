import * as React from "react";
import AppHeader from "../SharedLayout/AppHeader";
import CreateReleaseTabs from "./CreateReleaseTabs";
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
        <div className="min-h-screen bg-gray-50 flex flex-col pb-12">
            <AppHeader title="Create Audio Release" />

            {/* Tabs / Stepper */}
            <CreateReleaseTabs activeTab="Submission" />

            <div className="max-w-7xl mx-auto w-full px-4 mt-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Review & Submit Release</h1>
                    <p className="text-sm text-gray-500 mt-1">Please review your release information before submitting.</p>
                </div>

                {/* Review Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Artwork Column */}
                        <div className="flex flex-col items-center w-full lg:w-48 flex-shrink-0">
                            <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm relative group">
                                <img
                                    className="w-full h-full object-cover"
                                    src={`https://api.fmdigitalofficial.com/${getRelease?.data?.data?.ImageDocument}`}
                                    alt="Art Work"
                                />
                            </div>
                            <p className="mt-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Album Artwork</p>
                            
                            <button
                                type="button"
                                className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5 px-4 py-2 border border-blue-200 rounded-full bg-blue-50 hover:bg-blue-100"
                                onClick={() => navigate(`/ReleaseInfo/AudioRelease`)}
                            >
                                Edit Release Info
                            </button>
                        </div>

                        {/* Details Column */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {/* Left Grid */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Release Title:</span>
                                        <span className="text-sm font-medium text-gray-900">{getSubmissions?.data?.data?.Title || "---"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Primary Artist:</span>
                                        <span className="text-sm font-medium text-gray-900">{getSubmissions?.data?.data?.Artist || "---"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Label:</span>
                                        <span className="text-sm font-medium text-gray-900">{getSubmissions?.data?.data?.Label || "---"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Genre:</span>
                                        <span className="text-sm font-medium text-gray-900">{getRelease?.data?.data?.Genre || "---"}</span>
                                    </div>
                                </div>

                                {/* Right Grid */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Number of Tracks:</span>
                                        <span className="text-sm font-medium text-gray-900">{getRelease?.data?.data?.Songs || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Primary Date:</span>
                                        <span className="text-sm font-medium text-gray-900">{getRelease?.data?.data?.ReleaseDate || "---"}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-sm font-semibold text-gray-500">Subgenre:</span>
                                        <span className="text-sm font-medium text-gray-900">{getRelease?.data?.data?.SubGenre || "---"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms Bar */}
                <div className="mt-8 bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            onChange={(event) => setUserIagery(event.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                            I understand and agree to the <a href="https://fmdigitalofficial.com/support/legal-documents" target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 hover:text-blue-600 underline decoration-gray-300 underline-offset-4 transition-colors">FM Digital Distribution Terms & Privacy Policy.</a>
                        </label>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={() => handleSubmit()}
                        disabled={!userIagery || isLoadingSubmissionPost}
                        className={`group relative flex items-center gap-2 px-8 py-3 text-base font-semibold text-white transition-all rounded-full shadow-lg ${
                            userIagery 
                            ? 'bg-gray-900 hover:bg-gray-800' 
                            : 'bg-gray-400 cursor-not-allowed opacity-70'
                        }`}
                    >
                        <span>{isLoadingSubmissionPost ? "Submitting..." : "Submit Release"}</span>
                        <AiFillSave className={`transition-transform duration-200 ${userIagery ? 'group-hover:scale-110' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    )
}
