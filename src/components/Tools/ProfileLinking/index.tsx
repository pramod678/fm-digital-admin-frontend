import * as React from "react";
import { BounceLoader, BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { ProfileLinkingDto } from "../../../types/tools";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../api/releaseInfo";
import { GetAllReleseInfoApi, ProfileLinkinAdudiogGetApi } from "../../../api/youtubeClaims";
import { ProfileLinkingGetAllApi, ProfileLinkingPostApi } from "../../../lib/endpoint";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import SelectRelease from "../../../ui/SelectRelease";
import SelectAudio from "../../../ui/SelectAudio";

export default function Index() {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<ProfileLinkingDto>()

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [releseInfoGetOne, setReleseInfoGetOne] = React.useState<any>([]);
    const [selectRelease, setSelectRelease] = React.useState<any>([]);
    const [selectedId, setSelectedId] = React.useState<any>();

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: GetAllReleseInfo, isLoading: isLoadingGetAllReleseInfo } = GetAllReleseInfoApi(userData.users_id, setReleseInfoGetOne)
    const { data: ProfileLinkingGetAll, isLoading: isLoadingProfileLinkingGetAll, isFetching } = ProfileLinkingGetAllApi(userData.users_id)
    
    // Profiles for dropdowns
    const { data: ProfileLinkinAdudiogGet, isLoading: isLoadingProfileLinkinAdudiogGet } = ProfileLinkinAdudiogGetApi(releseInfoGetOne[0]?.users_id, selectedId)
    const { mutate: ProfileLinkingPost, isLoading: isLoadingProfileLinkingPost } = ProfileLinkingPostApi(reset, () => {})

    const [records, setRecords] = React.useState(ProfileLinkingGetAll?.data?.data || []);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const PAGE_SIZE = 10;

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    React.useEffect(() => {
        setRecords(ProfileLinkingGetAll?.data?.data);
        setCurrentPage(1);
    }, [ProfileLinkingGetAll]);

    React.useEffect(() => {
        const selectedObj = releseInfoGetOne?.filter((r: any) => r?.ReleaseTitle === selectRelease)
        setSelectedId(selectedObj[0]?.releseInfo_id)
    }, [selectRelease]);

    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(records, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filteredRecords?.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const filterRecords = (data: any[], term: string) => {
        return data?.filter(
            (row) =>
                row?.Selectrelease?.toLowerCase().includes(term) ||
                row?.SelectAudio?.toLowerCase().includes(term) ||
                row?.ArtistName?.toLowerCase().includes(term)
        );
    };

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.users_id = parseInt(userData.users_id);
        
        // BACKEND INTEGRATION PLACEHOLDER (Commented out per request)
        console.log("Profile Linking Form Submitted:", newData);
        // ProfileLinkingPost(newData); 
        
        alert("Form implementation verified. Backend call is commented out.");
    })

    const currentData = getCurrentPageData();
    const filteredRecords = filterRecords(records, searchTerm);
    const totalPages = Math.ceil(filteredRecords?.length / PAGE_SIZE);

    return (
        <>
            {(isLoadingProfileLinkingGetAll || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100]">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-800 typo-page-title">Profile Linking</h1>
                </div>

                {/* Inline Form Card */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-10 max-w-5xl">
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="w-full">
                                <Label text="Select Release" htmlFor="grid-Selectrelease" required={true} />
                                <SelectRelease control={control} name="Selectrelease" options={releseInfoGetOne} errors={errors} required={true} setSelectRelease={setSelectRelease} />
                            </div>

                            <div className="w-full">
                                <Label text="Select Audio" htmlFor="grid-SelectAudio" required={true} />
                                <SelectAudio control={control} name="SelectAudio" options={ProfileLinkinAdudiogGet?.data?.data} errors={errors} required={true} />
                            </div>

                            <div className="w-full">
                                <Label text="Artist Name" htmlFor="grid-Artist" required={true} />
                                <InputField
                                    type="text"
                                    name="ArtistName"
                                    placeholder="Make Sure to enter the exact name of artist"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Artist Name is required."
                                />
                            </div>

                            <div className="w-full">
                                <Label text="Facebook link" htmlFor="grid-FecebookLink" required={true} />
                                <InputField
                                    type="url"
                                    name="FecebookLink"
                                    placeholder="Enter Facebook Link"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Facebook Link is required."
                                />
                            </div>

                            <div className="w-full">
                                <Label text="Instagram link" htmlFor="grid-InstagramLink" required={true} />
                                <InputField
                                    type="url"
                                    name="InstagramLink"
                                    placeholder="Enter Instagram Link"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Instagram Link is required."
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoadingProfileLinkingPost}
                                className="px-8 py-2.5 bg-[#00c26d] text-white rounded-lg font-bold hover:bg-[#00a65d] transition-all shadow-md typo-btn-main flex items-center justify-center min-w-[140px]"
                            >
                                {isLoadingProfileLinkingPost ? <BeatLoader size={8} color="#ffffff" /> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* History Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                    <h2 className="text-xl font-bold text-gray-800 typo-section-title">History</h2>
                    <p className="text-gray-600 font-semibold typo-table-cell">
                        Total Claims: <span className="text-gray-800">{ProfileLinkingGetAll?.data?.data?.length || 0}</span>
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f3f4ff]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">No.</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">Release Title</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">Audio Title</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">Artist Name</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider text-center typo-table-head">Facebook ID</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider text-center typo-table-head">Instagram ID</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">Reason</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider text-center typo-table-head">Status</th>
                                    <th className="px-6 py-4 text-left text-[11px] text-gray-600 font-bold uppercase tracking-wider typo-table-head">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentData?.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-10 text-gray-500" colSpan={9}>
                                            No records found.
                                        </td>
                                    </tr>
                                ) : (
                                    currentData?.map((link: any, index: number) => (
                                        <ListRow 
                                            key={link.id || index} 
                                            link={link} 
                                            index={index}
                                            currentPage={currentPage}
                                            PAGE_SIZE={PAGE_SIZE} 
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-6 gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            <FiChevronLeft size={20} className="text-gray-600" />
                        </button>
                        <span className="font-medium text-gray-700">{`Page: ${currentPage}`}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            <FiChevronRight size={20} className="text-gray-600" />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
