import * as React from "react";
import { BounceLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { YouTubeClaimsDto, policyOptions } from "../../../../types/tools";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../../api/releaseInfo";
import { GetAllAdminYoutubeClaimsApi, GetAllReleseInfoApi, ProfileLinkinAdudiogGetApi, ReleseInfoGetOneApi, YoutubeClaimsGetAllApi, YoutubeClaimsPostApi } from "../../../../api/youtubeClaims";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GetAllUsersDataApi } from "../../../../api/user";
import RejectClaimModal from "./RejectClaimModal";
import { UpdateYoutubeClaimsApi } from "../../../../api/youtubeClaims";



export default function AdminYouTubeClaimsIndex() {

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
    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    // Dummy data for UI testing
    const dummyData = [
        {
            users_id: "50",
            users: [{ fname: "Ram Kumar", lname: "Singh", email: "User1@gmail.com" }],
            Selectrelease: "Jodi Rana Rani ki",
            SelectAudio: "Jodi Rana Rani ki",
            PasteURL: "https://youtube.com/watch?v=1",
            Selectplatform: "Youtube Content ID",
            SelectPolicy: "Remove",
            Status: 0,
            createdAt: "2025-02-14T10:33:00"
        },
        {
            users_id: "50",
            users: [{ fname: "Ram Kumar", lname: "Singh", email: "User1@gmail.com" }],
            Selectrelease: "Jodi Rana Rani ki",
            SelectAudio: "Jodi Rana Rani ki",
            PasteURL: "https://youtube.com/watch?v=2",
            Selectplatform: "Youtube Content ID",
            SelectPolicy: "Remove",
            Status: 0,
            createdAt: "2025-02-14T11:45:00"
        },
        {
            users_id: "50",
            users: [{ fname: "Ram Kumar", lname: "Singh", email: "User1@gmail.com" }],
            Selectrelease: "Song Name",
            SelectAudio: "Song Name",
            PasteURL: "https://soundcloud.com/track1",
            Selectplatform: "Soundcloud",
            SelectPolicy: "Block",
            Status: 2,
            Reason: "Please email about this conflict",
            updatedAt: "2025-02-14T12:00:00"
        },
        {
            users_id: "42",
            users: [{ fname: "Alice", lname: "Smith", email: "alice@example.com" }],
            Selectrelease: "Ocean Waves",
            SelectAudio: "Deep Blue",
            PasteURL: "https://youtube.com/watch?v=3",
            Selectplatform: "Youtube",
            SelectPolicy: "Monetize",
            Status: 4,
            updatedAt: "2025-02-15T09:00:00"
        },
        {
            users_id: "21",
            users: [{ fname: "Bob", lname: "Jones", email: "bob@test.com" }],
            Selectrelease: "Summer Chill",
            SelectAudio: "Sunset",
            PasteURL: "https://youtube.com/watch?v=4",
            Selectplatform: "Youtube",
            SelectPolicy: "Remove",
            Status: 4,
            updatedAt: "2025-02-15T10:30:00"
        }
    ];

    const [catalogs, setCatalogs] = React.useState<any[]>(dummyData);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    // Rejection Modal State
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [selectedClaim, setSelectedClaim] = React.useState<any>(null);

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: allUsersData } = GetAllUsersDataApi();
    // Always fetch all claims to support dual-table view
    const { data: YoutubeClaims, isLoading: isLoadingYoutubeClaimsPost, isFetching } = GetAllAdminYoutubeClaimsApi('', '')
    const { mutate: UpdateYoutubeClaims } = UpdateYoutubeClaimsApi();

    const handleOpenRejectModal = (claim: any) => {
        setSelectedClaim(claim);
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = (reason: string) => {
        if (selectedClaim) {
            UpdateYoutubeClaims({ 
                users_id: selectedClaim.users_id, 
                youtubeClaims_id: selectedClaim.youtubeClaims_id, 
                "Status": 2,
                "Reason": reason 
            });
        }
    };

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    const PAGE_SIZE = 8;
    React.useEffect(() => {
        if (YoutubeClaims?.data?.data) {
            setCatalogs([...dummyData, ...YoutubeClaims.data.data]);
        }
    }, [YoutubeClaims]);

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
        // Filter for History (Status !== 0) only
        let historyOnly = catalogs.filter((c: any) => c.Status !== 0);
        
        // Apply Search Term (Release Title)
        if (searchTerm) {
            historyOnly = filterRecords(historyOnly, searchTerm);
        }

        // Apply User ID Filter
        if (userId) {
            historyOnly = historyOnly.filter((c: any) => String(c.users_id) === String(userId));
        }
        
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const slicedRecords = historyOnly.slice(startIndex, endIndex);
        return { slicedRecords, totalFilteredRecords: historyOnly.length };
    };

    const { slicedRecords, totalFilteredRecords } = getCurrentPageData();
    const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);

    /* 
       BACKEND NOTE: 
       The 'catalogs' state currently mixes dummyData with API data for UI testing.
       When the backend is fully ready, remove 'dummyData' and use only 'YoutubeClaims.data.data'.
    */
    const pendingClaims = catalogs.filter((c: any) => c.Status === 0);
    const historyClaims = slicedRecords;

    return (
        <div className="min-h-screen bg-gray-50/30">
            {(isLoadingYoutubeClaimsPost || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-white/50 backdrop-blur-sm">
                    <BounceLoader size={60} color={"#00c26d"} />
                </div>
            )}
            
            <div className="p-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-xl font-bold text-gray-800 typo-page-title">UGC Claims</h1>
                </div>

                {/* Pending Section */}
                <div className="mb-10">
                    <div className="flex justify-end items-center mb-3">
                        <span className="text-[13px] text-gray-500 font-semibold typo-table-cell-strong">Pending: {pendingClaims.length}</span>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#f8f9fe] sticky top-0 z-10">
                                    <tr>
                                        {["No.", "User Id", "User Name", "Email", "Release Title", "Audio Title", "URLs", "Platform", "Policy", "Status", "Created At"].map((head) => (
                                            <th key={head} scope="col" className="px-2 py-3.5 text-left text-[10px] text-gray-400 font-bold uppercase tracking-wider typo-table-head">
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {pendingClaims.length === 0 ? (
                                        <tr>
                                            <td className="text-center py-10 text-gray-400 text-sm" colSpan={11}>No pending claims found.</td>
                                        </tr>
                                    ) : (
                                        pendingClaims.map((claim: any, index: number) => (
                                            <ListRow 
                                                key={index} 
                                                claim={claim} 
                                                index={index} 
                                                currentPage={1} 
                                                PAGE_SIZE={pendingClaims.length} 
                                                tableType="pending" 
                                                onRejectClick={() => handleOpenRejectModal(claim)}
                                            />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-gray-800 typo-section-title mr-4">History</h2>
                            
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="px-4 py-2 w-48 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c26d]/20 focus:border-[#00c26d] transition-all typo-table-cell text-xs shadow-sm"
                                    placeholder="Release Title"
                                    onChange={handleFilter}
                                />
                                <div className="relative">
                                    <select
                                        className="appearance-none px-4 py-2 w-56 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c26d]/20 focus:border-[#00c26d] transition-all typo-table-cell text-xs shadow-sm pr-10"
                                        onChange={(e: any) => setUserId(e.target.value)}
                                        value={userId}
                                    >
                                        <option value="">Search User Id/Name</option>
                                        {allUsersData?.data?.data?.map((user: any) => (
                                            <option key={user?.users_id} value={user?.users_id}>
                                                {user?.users_id + " - " + user?.fname + " " + user?.lname}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                             <span className="text-[13px] text-gray-500 font-semibold typo-table-cell-strong">Total Claims: {totalFilteredRecords || 0}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#f1f2f9] sticky top-0 z-10">
                                    <tr>
                                        {["No.", "User Id", "Release Title", "Audio Title", "Platform URLs", "Reason", "Policy", "Status", "Modified Date"].map((head) => (
                                            <th key={head} scope="col" className="px-2 py-3.5 text-left text-[10px] text-gray-400 font-bold uppercase tracking-wider typo-table-head">
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {historyClaims.length === 0 ? (
                                        <tr>
                                            <td className="text-center py-10 text-gray-400 text-sm" colSpan={9}>No history records found.</td>
                                        </tr>
                                    ) : (
                                        historyClaims.map((claim: any, index: number) => (
                                            <ListRow key={index} claim={claim} index={index} currentPage={currentPage} PAGE_SIZE={PAGE_SIZE} tableType="history" />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-end items-center gap-3">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <FiChevronLeft size={18} />
                            </button>
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
                                <span className="text-xs font-bold text-gray-700">Page: {currentPage}</span>
                            </div>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <FiChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Rejection Modal */}
            <RejectClaimModal 
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleConfirmReject}
            />
        </div>
    );
}