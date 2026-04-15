import * as React from "react";
import { UserDataApi } from "../../../api/releaseInfo";
import { useNavigate } from "react-router-dom";
import { GetAllAdminLabelsApi } from "../../../api/endpoint";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LabelListRow from "./LabelListRow";
import { GetAllUsersDataApi } from "../../../api/user";
import AddLabel from "../PopUps/AddLabel";
import { FiSearch } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import AppHeader from "../../SharedLayout/AppHeader";

export default function AdminLabelIndex() {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")

    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [catalogs, setCatalogs] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate,)
    const { data: GetAllLabels, isLoading: isLoadingGetAllLabels, isFetching } = GetAllAdminLabelsApi(userId, statusId)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const { data: allUsersData } = GetAllUsersDataApi();

    const dummyData = [
        {
            label_id: "LBL-001",
            users_id: "USR-001",
            users: [{ fname: "John", lname: "Doe", email: "john@example.com" }],
            title: "Ocean Records",
            youtubeURL: "https://youtube.com/c/oceanrecords",
            labelDocument: "dummy_doc_1.pdf",
            Status: 4, // Approved
            createdAt: "2023-11-20T10:30:00Z"
        },
        {
            label_id: "LBL-002",
            users_id: "USR-002",
            users: [{ fname: "Sarah", lname: "Smith", email: "sarahS@example.com" }],
            title: "Indie Beats",
            youtubeURL: "https://youtube.com/c/indiebeats",
            labelDocument: "dummy_doc_2.pdf",
            Status: 0, // Pending
            createdAt: "2023-12-05T14:15:00Z"
        },
        {
            label_id: "LBL-003",
            users_id: "USR-003",
            users: [{ fname: "Mike", lname: "Johnson", email: "mike.j@example.com" }],
            title: "Lofi Central",
            youtubeURL: "https://youtube.com/c/loficentral",
            labelDocument: "dummy_doc_3.pdf",
            Status: 2, // Rejected
            createdAt: "2024-01-10T09:45:00Z"
        }
    ];

    const PAGE_SIZE = 8
    React.useEffect(() => {
        if (GetAllLabels && GetAllLabels.data && GetAllLabels.data.data && GetAllLabels.data.data.length > 0) {
            setCatalogs(GetAllLabels.data.data);
        } else {
            // Use dummy data if API returns empty or fails
            setCatalogs(dummyData as any);
        }
        setCurrentPage(1);
    }, [GetAllLabels]);

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
                row?.title.toLowerCase().includes(term));
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

    return (
        <>
            <AppHeader title="Label" />
            <div className="p-6 bg-white min-h-screen font-poppins">
                {(isLoadingGetAllLabels || isFetching) && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white/50 backdrop-blur-sm">
                        <BounceLoader size={120} color={"#00b768"} />
                    </div>
                )}

                {/* Title */}
                <div className="mb-4">
                    <h1 className="typo-page-title">Label</h1>
                </div>

                {/* Filters Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search Label */}
                        <div className="relative">
                            <input
                                type="text"
                                className="pl-3 pr-8 py-1.5 w-40 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none text-xs placeholder:text-gray-400 shadow-sm transition-all"
                                placeholder="Search Label"
                                onChange={handleFilter}
                            />
                            <FiSearch className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>

                        {/* Search User Id/Name */}
                        <div className="relative group">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="pl-3 pr-8 py-1.5 w-56 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none text-xs placeholder:text-gray-400 shadow-sm transition-all cursor-pointer"
                                    placeholder="Search User Id/Name"
                                    value={userId ? allUsersData?.data?.data?.find((u: any) => String(u.users_id) === String(userId))?.fname || "" : ""}
                                    readOnly
                                />
                                <div className="absolute right-2.5 flex items-center gap-1.5 border-l pl-1.5 border-gray-200">
                                    <IoMdArrowDropdown className="text-gray-400 group-hover:text-gray-600 transition-colors" size={16} />
                                </div>
                            </div>
                            
                            <select
                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                onChange={(e: any) => setUserId(e.target.value)}
                                value={userId}
                            >
                                <option value="">Search User Id/Name</option>
                                {allUsersData?.data?.data?.map((user: any) => (
                                    <option key={user.users_id} value={user.users_id}>
                                        {user.users_id} - {user.fname} {user.lname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Toggles */}
                        <div className="flex items-center gap-2 ml-1">
                            <button
                                onClick={() => setStatusId(statusId === "0" ? "" : "0")}
                                className={`px-4 py-1.5 rounded-lg border transition-all text-xs font-semibold shadow-sm ${
                                    statusId === "0" 
                                    ? "bg-gray-100 border-gray-300 text-gray-800" 
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setStatusId(statusId === "4" ? "" : "4")}
                                className={`px-4 py-1.5 rounded-lg border transition-all text-xs font-semibold shadow-sm ${
                                    statusId === "4" 
                                    ? "bg-[#e6f7ef] border-[#00b768]/30 text-[#00b768]" 
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                            >
                                Approved
                            </button>
                            <button
                                onClick={() => setStatusId(statusId === "2" ? "" : "2")}
                                className={`px-4 py-1.5 rounded-lg border transition-all text-xs font-semibold shadow-sm ${
                                    statusId === "2" 
                                    ? "bg-[#fef2f2] border-pink-200 text-pink-600" 
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <AddLabel userData={userData} />
                        <div className="typo-table-cell whitespace-nowrap">
                            Total Labels: <span className="font-semibold text-red-600">{totalFilteredRecords || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-2">
                    <table className="w-full divide-y divide-gray-100 table-auto">
                        <thead className="bg-[#f8f9fa]">
                            <tr>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[5%]">
                                    No.
                                </th>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[8%] whitespace-nowrap">
                                    User Id
                                </th>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[12%]">
                                    User Name
                                </th>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[18%]">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[15%]">
                                    Channel Name
                                </th>
                                <th scope="col" className="px-3 py-2 text-center typo-table-head w-[10%]">
                                    Channel URL
                                </th>
                                <th scope="col" className="px-3 py-2 text-center typo-table-head w-[10%]">
                                    Attachment
                                </th>
                                <th scope="col" className="px-3 py-2 text-center typo-table-head w-[10%]">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-2 text-left typo-table-head w-[12%]">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {slicedRecords?.length === 0 ? (
                                <tr className="w-full">
                                    <td className="text-center py-10 text-gray-400 font-medium" colSpan={10}>
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                slicedRecords?.map((data: any, index: any) => (
                                    <LabelListRow 
                                        key={data.label_id} 
                                        label={data} 
                                        index={index} 
                                        currentPage={currentPage}
                                        PAGE_SIZE={PAGE_SIZE} 
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all border border-gray-200"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span className="mx-6 typo-table-cell">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all border border-gray-200"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}