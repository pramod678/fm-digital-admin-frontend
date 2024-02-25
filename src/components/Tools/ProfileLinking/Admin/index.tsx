import * as React from "react";
import { BounceLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { ProfileLinkingDto, YouTubeClaimsDto, policyOptions } from "../../../../types/tools";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../../api/releaseInfo";
import { GetAllReleseInfoApi, ProfileLinkinAdudiogGetApi, ReleseInfoGetOneApi, YoutubeClaimsGetAllApi, YoutubeClaimsPostApi } from "../../../../api/youtubeClaims";
import { GetAllAdminProfileLinkingApi, ProfileLinkingGetAllApi, ProfileLinkingPostApi } from "../../../../api/profileLinking";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GetAllUsersDataApi } from "../../../../api/user";




export default function AdminProfileLinkingIndex() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<ProfileLinkingDto>()

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [catalogs, setCatalogs] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);


    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    const { data: profilelinkings, isLoading: isLoadingprofilelinkingsPost, isFetching } = GetAllAdminProfileLinkingApi(userId, statusId)
    const { data: allUsersData } = GetAllUsersDataApi();


    React.useEffect(() => {
        getUserData({ token: token });
    }, []);


    const PAGE_SIZE = 25
    React.useEffect(() => {
        if (profilelinkings) {
            setCatalogs(profilelinkings.data.data);
            setCurrentPage(1);
        }
    }, [profilelinkings]);

    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const filterRecords = (data: any, term: any) => {
        return data.filter(
            (row: any) =>
                row?.Selectrelease.toLowerCase().includes(term));
    };

    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(catalogs, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const slicedRecords = filteredRecords.slice(startIndex, endIndex);
        return { slicedRecords, totalFilteredRecords: filteredRecords.length };
    };

    const { slicedRecords, totalFilteredRecords } = getCurrentPageData();
    const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);


    // instead of status action two buttons approve and reject 
    // filters same as ticket and remove add button
    return (
        <>
            {(isLoadingprofilelinkingsPost || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Profile Linking</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title"
                            defaultValue={""}
                        onChange={handleFilter}
                        />
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setStatusId(e.target.value)}
                            value={statusId}
                        >
                            <option value="">All</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Pending</option>
                            <option value={2}>Rejected</option>
                        </select>

                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 overflow-y-scroll"
                            onChange={(e: any) => setUserId(e.target.value)}
                            value={userId}
                        >
                            <option value="">UserId</option>
                            {
                                allUsersData?.data?.data?.map((user: any) => {
                                    return (
                                        <>
                                            <option value={user?.users_id}>{user?.users_id +" - "+user?.fname + " " + user?.lname}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="mt-4 sm:mt-0">
                        <p className="font-semibold text-gray-700">Total Profiles: {totalFilteredRecords || 0}</p>
                    </div>
                </div>

                <p className="text-base sm:text-lg font-semibold my-4 ">Your Profile Linking History</p>

                <div className="p-4">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    No.
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    User ID
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    User Name
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Release Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Audio Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Artist
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Fb
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Ig
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                slicedRecords?.length === 0 ? (
                                                    <tr className="w-full">
                                                        <td className="text-center py-4" colSpan={8}>
                                                            No records found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    slicedRecords?.map((link: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ListRow link={link} index={index}
                                                                    currentPage={currentPage}
                                                                    PAGE_SIZE={PAGE_SIZE} />
                                                            </React.Fragment>
                                                        )
                                                    })
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-end items-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md bg-neutral-700 text-gray-600 hover:bg-neutral-800  disabled:opacity-50"
                            >
                                <FiChevronLeft color="white" />
                            </button>
                            <span className="mx-4 text-gray-600">{`Page: ${currentPage}`}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md bg-neutral-700 text-gray-600 hover:bg-neutral-800  disabled:opacity-50"
                            >
                                <FiChevronRight color="white" />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}