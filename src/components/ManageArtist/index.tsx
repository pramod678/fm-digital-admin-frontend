import * as React from "react";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { GetPrimaryArtistApi, UserDataApi } from "../../api/releaseInfo";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BounceLoader } from "react-spinners";

const Index = () => {
    const [userData, setUserData] = React.useState<any>("");
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const pageSize = 10;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { mutate: getUserData } = UserDataApi(setUserData, navigate);
    const { data: GetPrimaryArtist, isLoading, isFetching } = GetPrimaryArtistApi(userData.users_id);

    React.useEffect(() => {
        if (token) {
            getUserData({ token: token });
        }
    }, [token]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const artists: any[] = GetPrimaryArtist?.data?.data || [];
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const filteredArtists = React.useMemo(() => {
        return artists.filter((artist: any) => 
            artist.PrimaryArtist?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [artists, searchTerm]);

    React.useEffect(() => {
        setTotalPages(Math.ceil(filteredArtists.length / pageSize));
        setCurrentPage(1);
    }, [filteredArtists, pageSize]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredArtists.length);
    const displayedArtists = filteredArtists.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-white font-['Poppins']">
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-[100] bg-white/50">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}

            {/* Header section from mockup - scaled down */}
            <div className="flex justify-between items-center px-8 py-5 bg-[#f4f2ff] border-b border-gray-100">
                <h1 className="typo-page-title">Manage artists</h1>
                <div className="flex items-center gap-4">
                    <div className="bg-[#00b768] text-white px-3.5 py-1.5 rounded-xl typo-btn-action shadow-sm normal-case">
                        Career Artist
                    </div>
                    <button className="text-gray-900 hover:text-gray-700 transition-colors">
                        <IoNotificationsOutline size={24} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center typo-table-cell-strong text-gray-800 border border-gray-300 shadow-sm overflow-hidden">
                        {userData?.fname?.substring(0, 1).toUpperCase() || 'A'}
                        {userData?.lname?.substring(0, 1).toUpperCase() || 'B'}
                    </div>
                </div>
            </div>

            <div className="px-8 py-6">
                {/* Search and Action area - scaled down */}
                <div className="flex items-center justify-between mb-6">
                    <div className="relative w-80 group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Artist"
                            className="w-full pl-11 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] transition-all typo-table-cell placeholder:text-gray-400 font-medium shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button 
                            className="bg-[#00b768] text-white px-4 py-2 rounded-xl typo-btn-action shadow-sm hover:bg-green-600 transition-all normal-case"
                            onClick={() => navigate('/manage-artist')}
                        >
                            Go To Featuring Artist
                        </button>
                        <div className="typo-table-cell text-gray-500">
                            Total Artist: <span className="font-semibold text-[#00b768]">{filteredArtists.length}</span>
                        </div>
                    </div>
                </div>

                {/* Table container - scaled down */}
                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
                    <table className="min-w-full">
                        <thead className="bg-white border-b border-gray-100 font-['Poppins']">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-4 text-left typo-table-head">
                                    Artist Name
                                </th>
                                <th scope="col" className="px-6 py-4 text-center typo-table-head">
                                    Instagram ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-center typo-table-head">
                                    Facebook ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-center typo-table-head">
                                    Spotify ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-center typo-table-head">
                                    Apple ID
                                </th>
                                <th scope="col" className="px-6 py-4 text-center typo-table-head">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {displayedArtists.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-12 text-center text-gray-400 typo-table-cell" colSpan={7}>
                                        No artists found.
                                    </td>
                                </tr>
                            ) : (
                                displayedArtists.map((artist: any, index: any) => (
                                    <ListRow key={index} data={artist} index={startIndex + index} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <span className="mx-4 typo-table-cell">{`Page: ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-400 hover:text-gray-900 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;