import * as React from "react";
import ListRow from "./ListRow";
import { Link, useNavigate } from "react-router-dom";
import { GetAllAdminFeaturingArtistApi, GetAllAdminPrimaryArtistApi, GetPrimaryArtistApi, UserDataApi } from "../../../../api/releaseInfo";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BounceLoader } from "react-spinners";
import { GetAllUsersDataApi } from "../../../../api/user";



const AdminFeaturingArtistIndex = ({ showPrimaryArtist }: { showPrimaryArtist :any}) => {

    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [catalogs, setCatalogs] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { data: GetFeaturingArtist, isLoading, isFetching } = GetAllAdminFeaturingArtistApi(userId, showPrimaryArtist);

    const { data: allUsersData } = GetAllUsersDataApi();

    const PAGE_SIZE = 25
    React.useEffect(() => {
        if (GetFeaturingArtist) {
            setCatalogs(GetFeaturingArtist.data.data);
            setCurrentPage(1);
        }
    }, [GetFeaturingArtist]);

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
                row?.FeaturingArtist.toLowerCase().includes(term)
        );
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
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}

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
                        className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 overflow-y-scroll"
                        onChange={(e: any) => setUserId(e.target.value)}
                        value={userId}
                    >
                        <option value="">UserId</option>
                        {
                            allUsersData?.data?.data?.map((user: any) => {
                                return (
                                    <>
                                        <option value={user?.users_id}>{user?.fname + " " + user?.lname}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="mt-4 sm:mt-0">
                    <p className="text-right text-lg font-semibold text-black mt-2">Total Artists:{totalFilteredRecords || 0}</p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Artist Id
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
                                                Artist Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Instagram Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Apple Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 mt-2">
                                        {
                                            slicedRecords.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No labels found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                slicedRecords?.map((data: any, index: any) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <ListRow data={data} index={index} currentPage={currentPage}
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

        </>
    )
}
export default AdminFeaturingArtistIndex;