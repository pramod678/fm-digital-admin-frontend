import * as React from "react";
import { BounceLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { ProfileLinkingDto } from "../../../../types/tools";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../../api/releaseInfo";
import { GetAllAdminProfileLinkingApi } from "../../../../lib/endpoint";
import ListRow from "./ListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GetAllUsersDataApi } from "../../../../api/user";
import RejectProfileModal from "./RejectProfileModal";

export default function AdminProfileLinkingIndex() {
    const {
        control,
        formState: { errors }
    } = useForm<ProfileLinkingDto>();

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("");
    const token = localStorage.getItem("token");
    const [pendingProfiles, setPendingProfiles] = React.useState<any[]>([]);
    const [historyProfiles, setHistoryProfiles] = React.useState<any[]>([]);
    const [searchTermRelease, setSearchTermRelease] = React.useState('');
    const [searchTermUser, setSearchTermUser] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    // Rejection Modal State
    const [isRejectModalOpen, setIsRejectModalOpen] = React.useState(false);
    const [selectedProfile, setSelectedProfile] = React.useState<any>(null);

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate);
    const { data: profilelinkings, isLoading: isLoadingprofilelinkingsPost, isFetching } = GetAllAdminProfileLinkingApi("", "");
    const { data: allUsersData } = GetAllUsersDataApi();

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    const PAGE_SIZE = 10;

    const DUMMY_DATA = [
        {
            profileLinking_id: "dummy-1",
            users_id: 101,
            users: [{ fname: "John", lname: "Doe", email: "john@example.com" }],
            Selectrelease: "Midnight Vibes",
            SelectAudio: "Vibe Track 1",
            ArtistName: "The Dreamer",
            FecebookLink: "https://facebook.com",
            InstagramLink: "https://instagram.com",
            Status: 0,
            createdAt: new Date().toISOString()
        },
        {
            profileLinking_id: "dummy-2",
            users_id: 102,
            users: [{ fname: "Jane", lname: "Smith", email: "jane@example.com" }],
            Selectrelease: "Neon Sunset",
            SelectAudio: "Sunset Melody",
            ArtistName: "Jane Solo",
            FecebookLink: "https://facebook.com",
            InstagramLink: "https://instagram.com",
            Status: 4,
            createdAt: "2023-10-20T10:00:00Z",
            updatedAt: "2023-10-21T12:00:00Z"
        },
        {
            profileLinking_id: "dummy-3",
            users_id: 103,
            users: [{ fname: "Alice", lname: "Brown", email: "alice@example.com" }],
            Selectrelease: "Acoustic Soul",
            SelectAudio: "Gentle Guitar",
            ArtistName: "Alice & Friends",
            FecebookLink: "https://facebook.com",
            InstagramLink: "https://instagram.com",
            Status: 2,
            Reason: "Invalid Social Link",
            createdAt: "2023-10-15T08:30:00Z",
            updatedAt: "2023-10-16T14:45:00Z"
        }
    ];

    React.useEffect(() => {
        const backendData = profilelinkings?.data?.data || [];
        const combinedData = [...DUMMY_DATA, ...backendData];
        setPendingProfiles(combinedData.filter((item: any) => item.Status === 0));
        setHistoryProfiles(combinedData.filter((item: any) => item.Status !== 0));
        setCurrentPage(1);
    }, [profilelinkings]);

    const handleFilterRelease = (event: any) => {
        setSearchTermRelease(event.target.value.toLowerCase());
        setCurrentPage(1);
    };

    const handleFilterUser = (event: any) => {
        setSearchTermUser(event.target.value);
        setCurrentPage(1);
    };

    const handleOpenRejectModal = (profile: any) => {
        setSelectedProfile(profile);
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = (reason: string) => {
        console.log(`[Admin] Rejecting profile ${selectedProfile?.profileLinking_id} for user ${selectedProfile?.users_id} with reason: ${reason}`);
        alert(`Rejected profile for User ${selectedProfile?.users_id} with reason: ${reason} (Backend Disabled)`);
        setIsRejectModalOpen(false);
    };

    const filterHistory = (data: any[]) => {
        return data.filter((row: any) => {
            const matchesRelease = row?.Selectrelease?.toLowerCase().includes(searchTermRelease);
            const matchesUser = searchTermUser === "" || row?.users_id?.toString() === searchTermUser;
            return matchesRelease && matchesUser;
        });
    };

    const getPaginatedHistory = () => {
        const filtered = filterHistory(historyProfiles);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const sliced = filtered.slice(startIndex, startIndex + PAGE_SIZE);
        return { sliced, total: filtered.length };
    };

    const { sliced: historyData, total: totalHistory } = getPaginatedHistory();
    const totalPages = Math.ceil(totalHistory / PAGE_SIZE);

    return (
        <div className="font-['Poppins']">
            {(isLoadingprofilelinkingsPost || isFetching) && (
                <div className="fixed inset-0 flex justify-center items-center z-[100] bg-white/50">
                    <BounceLoader size={100} color={"#00c26d"} />
                </div>
            )}
            
            <div className="p-6 bg-white min-h-screen">
                {/* Pending Table Section */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-medium text-gray-800 typo-page-title">Profile Linking</h1>
                    <p className="text-gray-800 font-medium typo-section-title">Pending: {pendingProfiles.length}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-12">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f3f4ff]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">No.</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">User Id</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">User Name</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Email</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Release Title</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Audio Title</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Artist Name</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Facebook ID</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Instagram ID</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Status</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {pendingProfiles.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-10 typo-table-cell text-gray-400" colSpan={11}>No pending claims found.</td>
                                    </tr>
                                ) : (
                                    pendingProfiles.map((link: any, index: any) => (
                                        <ListRow 
                                            key={link.profileLinking_id || index}
                                            link={link}
                                            index={index}
                                            type="pending"
                                            onReject={handleOpenRejectModal}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* History Table Section */}
                <div className="flex flex-col sm:flex-row justify-between items-end mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800 typo-section-title">History</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="px-3 py-1.5 text-xs rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-40"
                                placeholder="Release Title"
                                value={searchTermRelease}
                                onChange={handleFilterRelease}
                            />
                            <select
                                className="px-3 py-1.5 text-xs rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-56 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em_1em]"
                                style={{ backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')" }}
                                onChange={handleFilterUser}
                                value={searchTermUser}
                            >
                                <option value="">Search User Id/Name</option>
                                {allUsersData?.data?.data?.map((user: any) => (
                                    <option key={user.users_id} value={user.users_id}>
                                        {user.users_id} - {user.fname} {user.lname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <p className="text-gray-800 font-medium typo-section-title">Total Claims: {totalHistory}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#f3f4ff]">
                                <tr>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">No.</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">User Id</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Release Title</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Audio Title</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Artist Name</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Facebook ID</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Instagram ID</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Reason</th>
                                    <th className="px-4 py-3 text-center text-[11px] text-gray-600 font-bold uppercase typo-table-head">Status</th>
                                    <th className="px-4 py-3 text-left text-[11px] text-gray-600 font-bold uppercase typo-table-head">Modified Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {historyData.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-10 typo-table-cell text-gray-400" colSpan={10}>No history records found.</td>
                                    </tr>
                                ) : (
                                    historyData.map((link: any, index: any) => (
                                        <ListRow 
                                            key={link.profileLinking_id || index}
                                            link={link}
                                            index={index}
                                            currentPage={currentPage}
                                            PAGE_SIZE={PAGE_SIZE}
                                            type="history"
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination (for History table) */}
                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            <FiChevronLeft size={18} />
                        </button>
                        <div className="px-3 py-1 border border-gray-300 rounded bg-white">
                            <span className="text-xs font-medium text-gray-700">{`Page: ${currentPage}`}</span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            <RejectProfileModal 
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleConfirmReject}
                itemName="Release"
            />
        </div>
    );
}