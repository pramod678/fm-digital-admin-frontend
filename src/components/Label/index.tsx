import * as React from "react";
import AddLabel from "./PopUps/AddLabel";
import { UserDataApi } from "../../api/releaseInfo";
import { useNavigate } from "react-router-dom";
import { GetAllLabelsApi } from "../../api/label";
import { BounceLoader } from "react-spinners";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";

import { Label } from "../../types/label";

export default function Index() {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>(null);
    const token = localStorage.getItem("token")
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [filterStatus, setFilterStatus] = React.useState<string>("All");
    
    const pageSize = 10;
    const { mutate: getUserData } = UserDataApi(setUserData, navigate);
    const { data: GetAllLabels, isLoading: isLoadingGetAllLabels, isFetching } = GetAllLabelsApi(userData?.users_id);

    React.useEffect(() => {
        if (token) {
            getUserData({ token: token });
        }
    }, [token]);

    const labels: Label[] = GetAllLabels?.data?.data || [];

    const filteredLabels = React.useMemo(() => {
        return labels.filter((label: Label) => {
            const matchesSearch = label.title?.toLowerCase().includes(searchTerm.toLowerCase());
            if (filterStatus === "All") return matchesSearch;
            
            // Mapping mockup status to label.Status
            // 0=Pending, 1=Approved, 2=Rejected, 3=Draft, 4=Approved
            if (filterStatus === "Pending") return matchesSearch && label.Status === 0;
            if (filterStatus === "Approved") return matchesSearch && (label.Status === 1 || label.Status === 4);
            if (filterStatus === "Rejected") return matchesSearch && label.Status === 2;
            if (filterStatus === "Draft") return matchesSearch && label.Status === 3;
            
            return matchesSearch;
        });
    }, [labels, searchTerm, filterStatus]);

    React.useEffect(() => {
        setTotalPages(Math.ceil(filteredLabels.length / pageSize));
        setCurrentPage(1);
    }, [filteredLabels, pageSize]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredLabels.length);
    const displayedLabels = filteredLabels.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-white">
            {(isLoadingGetAllLabels || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-white/50">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            
            {/* Top Header */}
            <div className="flex justify-between items-center px-8 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                <h1 className="typo-page-title">Add Label</h1>
                <div className="flex items-center gap-4">
                    <div className="bg-[#00b768] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                        Career Artist
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                        <IoNotificationsOutline size={22} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center typo-table-cell-strong text-gray-600 border border-gray-300">
                        {userData?.name?.substring(0, 2).toUpperCase() || 'AB'}
                    </div>
                </div>
            </div>

            <div className="px-8 py-6">
                {/* Filters Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Label"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 w-64 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                             {["Pending", "Draft", "Approved", "Rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(filterStatus === status ? "All" : status)}
                                    className={`px-6 py-2 rounded-md border typo-btn-main transition-colors ${
                                        filterStatus === status
                                            ? status === "Approved" ? "bg-green-50 border-green-500 text-green-600" :
                                              status === "Rejected" ? "bg-red-50 border-red-500 text-red-600" :
                                              "bg-gray-100 border-gray-400 text-gray-800"
                                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <AddLabel userData={userData} />
                        <div className="typo-table-cell-strong">
                            Total Labels: {labels.length}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Url
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {displayedLabels.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-10 text-center text-gray-500 text-sm" colSpan={6}>
                                        No labels found.
                                    </td>
                                </tr>
                            ) : (
                                displayedLabels.map((label: any, index: any) => (
                                    <ListRow 
                                        key={label.label_id || index} 
                                        label={label} 
                                        index={startIndex + index} 
                                        userData={userData} 
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-6 gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span className="typo-table-cell">
                            Page: <span className="font-semibold">{currentPage}</span> of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-md border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}