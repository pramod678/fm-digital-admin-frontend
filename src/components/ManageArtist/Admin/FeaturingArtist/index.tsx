import * as React from "react";
import ListRow from "./ListRow";
import { Link, useNavigate } from "react-router-dom";
import { GetAllAdminFeaturingArtistApi, GetAllAdminPrimaryArtistApi, GetPrimaryArtistApi, UserDataApi } from "../../../../api/releaseInfo";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BounceLoader } from "react-spinners";
import { GetAllUsersDataApi } from "../../../../api/user";



const AdminFeaturingArtistIndex = ({ setShowPrimaryArtist, showPrimaryArtist }: { setShowPrimaryArtist: any, showPrimaryArtist: any }) => {

    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { data: GetFeaturingArtist, isLoading, isFetching } = GetAllAdminFeaturingArtistApi(userId, showPrimaryArtist);

    const dummyData = [
        {
            featuringArtist_id: 1,
            users_id: 'USR001',
            FeaturingArtist: 'Featuring Star 1',
            SpotifyId: 'https://spotify.com/artist/f1',
            AppleId: 'https://music.apple.com/artist/f1',
            users: [{ fname: 'John', lname: 'Doe', email: 'john@example.com' }]
        },
        {
            featuringArtist_id: 2,
            users_id: 'USR004',
            FeaturingArtist: 'Cool Rapper',
            SpotifyId: 'https://spotify.com/artist/f2',
            AppleId: '',
            users: [{ fname: 'Alice', lname: 'Wonder', email: 'alice@example.com' }]
        }
    ];

    const displayData = GetFeaturingArtist?.data?.data && GetFeaturingArtist.data.data.length > 0 
        ? GetFeaturingArtist.data.data 
        : dummyData;

    const [filteredData, setFilteredData] = React.useState<any>([]);
    const { data: allUsersData } = GetAllUsersDataApi();
    const PAGE_SIZE = 10;

    const handleFilter = (e: any) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = displayData.filter((item: any) =>
            item.FeaturingArtist.toLowerCase().includes(value) ||
            item.users_id.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    React.useEffect(() => {
        setFilteredData(displayData);
    }, [GetFeaturingArtist, displayData]);

    const lastIndex = currentPage * PAGE_SIZE;
    const firstIndex = lastIndex - PAGE_SIZE;
    const totalFilteredRecords = filteredData.length;
    const records = filteredData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);


    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}

            <div className="px-8 pt-8">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl typo-section-title tracking-tight">Featuring Artists</h2>
                </div>
                <hr className="border-gray-100 mb-6" />

                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none typo-table-cell placeholder:text-gray-300 transition-all shadow-sm w-64"
                                placeholder="Search Artist"
                                onChange={handleFilter}
                            />
                        </div>
                        <div className="relative w-full sm:w-72">
                            <select
                                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] transition-all typo-table-cell shadow-sm appearance-none"
                                onChange={(e: any) => setUserId(e.target.value)}
                                value={userId}
                            >
                                <option value="">Search User Id/Name</option>
                                {
                                    allUsersData?.data?.data?.map((user: any) => (
                                        <option key={user?.users_id} value={user?.users_id}>{user?.users_id + " - " + user?.fname + " " + user?.lname}</option>
                                    ))
                                }
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            className="flex items-center gap-2 px-4 py-2 bg-[#00c26d] border border-transparent rounded-xl hover:bg-[#00a65d] transition-all shadow-sm group"
                            onClick={() => setShowPrimaryArtist(true)}
                        >
                            <FiChevronLeft className="text-white group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-white typo-btn-main">Go To Primary Artist</span>
                        </button>
                        <div className="typo-table-cell-strong whitespace-nowrap">
                            Total Artist: {totalFilteredRecords || 0}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-8 pb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                        <thead className="bg-[#fcfdfd] border-b border-gray-100">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-left typo-table-head w-12">
                                    No.
                                </th>
                                <th scope="col" className="px-3 py-3 text-left typo-table-head w-24">
                                    User Id
                                </th>
                                <th scope="col" className="px-3 py-3 text-left typo-table-head">
                                    User Name
                                </th>
                                <th scope="col" className="px-3 py-3 text-left typo-table-head">
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-3 text-left typo-table-head">
                                    Artist Name
                                </th>
                                <th scope="col" className="px-3 py-3 text-center typo-table-head w-12">
                                    SP
                                </th>
                                <th scope="col" className="px-3 py-3 text-center typo-table-head w-12">
                                    AM
                                </th>
                                <th scope="col" className="px-3 py-3 text-center typo-table-head w-24">
                                    Action
                                </th>
                            </tr>
                        </thead>
                                    <tbody className="bg-white divide-y divide-gray-50">
                                        {
                                            records.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4 typo-table-cell" colSpan={8}>
                                                        No artists found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                records && records.map((data: any, index: any) => (
                                                    <ListRow 
                                                        key={data.featuringArtist_id || index} 
                                                        data={data} 
                                                        index={index} 
                                                        currentPage={currentPage}
                                                        PAGE_SIZE={PAGE_SIZE}
                                                    />
                                                ))
                                            )
                                        }
                                    </tbody>
                        </table>
                    </div>
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
        </>
    )
}
export default AdminFeaturingArtistIndex;