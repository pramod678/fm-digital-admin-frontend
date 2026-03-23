import * as React from "react";
import { BounceLoader } from "react-spinners";
import InputField from "../../../ui/InputField";
import Label from "../../../ui/Label";
import { useForm } from "react-hook-form";
import { YouTubeClaimsDto, policyOptions } from "../../../types/tools";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../api/releaseInfo";
import { GetAllReleseInfoApi, ProfileLinkinAdudiogGetApi, ReleseInfoGetOneApi, YoutubeClaimsGetAllApi, YoutubeClaimsPostApi } from "../../../api/youtubeClaims";
import SelectRelease from "../../../ui/SelectRelease";
import SelectAudio from "../../../ui/SelectAudio";
import SelectPlatform from "../../../ui/SelectPlatform";
import SelectPolicy from "../../../ui/SelectPolicy";
import { AiFillSave } from "react-icons/ai";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Edit from "./CreatePopup";



export default function Index() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<YouTubeClaimsDto>()

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [releseInfoGetOne, setReleseInfoGetOne] = React.useState<any>([]);
    const [selectRelease, setSelectRelease] = React.useState<any>("");
    const [selectedId, setSelectedId] = React.useState<any>();

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: GetAllReleseInfo, isLoading: isLoadingGetAllReleseInfo } = GetAllReleseInfoApi(userData.users_id, setReleseInfoGetOne)
    const { data: youtubeClaimsGetAll, isLoading: isLoadingyoutubeClaimsGetAll, isFetching } = YoutubeClaimsGetAllApi(userData.users_id)

    React.useEffect(() => {
        const selectedObj = releseInfoGetOne?.filter((r: any) => r?.ReleaseTitle === selectRelease)
        if (selectedObj?.length > 0) {
            setSelectedId(selectedObj[0]?.releseInfo_id)
        }
    }, [selectRelease, releseInfoGetOne]);

    const { data: ProfileLinkinAdudiogGet, isLoading: isLoadingProfileLinkinAdudiogGet } = ProfileLinkinAdudiogGetApi(releseInfoGetOne[0]?.users_id, selectedId)
    const { mutate: YoutubeClaimsPost, isLoading: isLoadingYoutubeClaimsPost } = YoutubeClaimsPostApi(reset, () => {}, setReleseInfoGetOne)

    const [records, setRecords] = React.useState(youtubeClaimsGetAll?.data?.data || []);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const PAGE_SIZE = 10; // Number of items per page

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    React.useEffect(() => {
        setRecords(youtubeClaimsGetAll?.data?.data);
        setCurrentPage(1); // Reset to first page when data changes
    }, [youtubeClaimsGetAll]);

    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(records, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filteredRecords?.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const filterRecords = (data: any[], term: string) => {
        return data?.filter(
            (row) =>
                row?.Selectrelease?.toLowerCase().includes(term) ||
                row?.SelectAudio?.toLowerCase().includes(term) ||
                row?.SelectPolicy?.toLowerCase().includes(term)
        );
    };

    React.useEffect(() => {
        setRecords(youtubeClaimsGetAll?.data?.data);
        setCurrentPage(1); // Reset to first page when data changes
    }, [youtubeClaimsGetAll]);

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.users_id = parseInt(userData.users_id);

        /* 
           BACKEND NOTE:
           Ensure 'YoutubeClaimsPost' successfully handles the UGC submission.
           Confirm that the 'Selectrelease', 'SelectAudio', etc. field names match the API's expected DTO.
        */
        YoutubeClaimsPost(newData)
    });

    const currentData = getCurrentPageData();
    const filteredRecords = filterRecords(records, searchTerm);
    const totalPages = Math.ceil(filteredRecords?.length / PAGE_SIZE);

    return (
        <>
            {(isLoadingyoutubeClaimsGetAll || isFetching || isLoadingYoutubeClaimsPost) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-white bg-opacity-50">
                    <BounceLoader size={80} color={"#00c26d"} />
                </div>
            )}
            
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800 typo-page-title">UGC Claims</h1>
                </div>

                {/* Inline Creation Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-8">
                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                            <div className="w-full">
                                <Label text="Select Release" htmlFor="Selectrelease" required={true} />
                                <SelectRelease 
                                    control={control} 
                                    name="Selectrelease" 
                                    options={releseInfoGetOne} 
                                    errors={errors} 
                                    required={true} 
                                    setSelectRelease={setSelectRelease} 
                                />
                            </div>

                            <div className="w-full">
                                <Label text="Select Audio" htmlFor="SelectAudio" required={true} />
                                <SelectAudio 
                                    control={control} 
                                    name="SelectAudio" 
                                    options={ProfileLinkinAdudiogGet?.data?.data} 
                                    errors={errors} 
                                    required={true} 
                                />
                            </div>

                            <div className="w-full">
                                <Label text="Select Platform" htmlFor="Selectplatform" required={true} />
                                <SelectPlatform 
                                    control={control} 
                                    name="Selectplatform" 
                                    errors={errors} 
                                    required={true} 
                                />
                            </div>

                            <div className="w-full">
                                <Label text="Select Policy" htmlFor="SelectPolicy" required={true} />
                                <SelectPolicy 
                                    control={control} 
                                    name="SelectPolicy" 
                                    options={policyOptions} 
                                    errors={errors} 
                                    required={true} 
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <Label text="URL" htmlFor="PasteURL" required={true} />
                            <div className="flex flex-col">
                                <button 
                                    type="button"
                                    className="text-left text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                                    onClick={() => {}} // Handle multiline URL entry if needed later
                                >
                                    0 URL added (Click to add)
                                </button>
                                <div className="mt-2 hidden"> {/* Keep InputField for form state */}
                                    <InputField
                                        type="url"
                                        name="PasteURL"
                                        placeholder="Paste URL"
                                        register={register}
                                        errors={errors}
                                        requiredMessage="PasteURL is required."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoadingYoutubeClaimsPost}
                                className="px-8 py-2.5 bg-[#00c26d] text-white font-bold rounded-xl hover:bg-[#00a65d] transition-all shadow-md typo-btn-main flex items-center justify-center min-w-[140px]"
                            >
                                {isLoadingYoutubeClaimsPost ? <BounceLoader size={20} color="#ffffff" /> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* History Header */}
                <div className="flex justify-between items-end mb-4 px-2">
                    <h2 className="text-xl font-bold text-gray-800 typo-section-title">History</h2>
                    <p className="text-gray-600 font-semibold typo-table-cell">
                        Total Claims: <span className="text-gray-800">{youtubeClaimsGetAll?.data?.data?.length || 0}</span>
                    </p>
                </div>

                {/* History Table Container */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar max-h-[500px]">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f0f0f9]">
                                <tr>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head w-12">
                                        No.
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Release Title
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Audio Title
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Platform URLs
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Reason
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Policy
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Status
                                    </th>
                                    <th scope="col" className="px-5 py-4 text-left text-[11px] text-gray-600 font-bold tracking-tight typo-table-head">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {currentData?.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-10 typo-table-cell text-gray-400" colSpan={8}>
                                            No claim history found.
                                        </td>
                                    </tr>
                                ) : (
                                    currentData?.map((claim: any, index: any) => (
                                        <ListRow 
                                            key={claim?._id || index} 
                                            claim={claim} 
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
                    <div className="flex justify-end items-center mt-6 space-x-2 px-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <span className="text-sm font-semibold text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}