import * as React from "react";
import ManageUserListRow from "./ManageUserListRow";
import {  GetAllUsersDataApi, GetAllUsersWithFiltersDataApi } from "../../api/user";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function ManageUserList() {

    const [users, setUsers] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { data: allUsersDataWithoutFilters } = GetAllUsersDataApi();
    const { data: allUsersData, isLoading, isFetching } = GetAllUsersWithFiltersDataApi(userId);


    React.useEffect(() => {
        if (allUsersData) {
            setUsers(allUsersData.data.data);
            setCurrentPage(1);
        }
    }, [allUsersData]);

    const PAGE_SIZE = 25
    const handleFilter = (event:any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };


    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const filterRecords = (data: any, term: any) => {
        return data
        
        // const filterRecords = (data: any, term: any) => {
        //     return data.filter(
        //         (row: any) =>
        //             row?.ReleaseTitle.toLowerCase().includes(term) ||
        //             row?.LabelName.toLowerCase().includes(term)
        //     );
        // };

    };


    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(users, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filteredRecords.slice(startIndex, endIndex);
    };

    const currentData = getCurrentPageData();
    const totalPages = Math.ceil(users.length / PAGE_SIZE);
    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Manage User</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-10 overflow-y-scroll"
                            onChange={(e: any) => setUserId(e.target.value)}
                            value={userId}
                        >
                            <option value="">UserId</option>
                            {
                                allUsersDataWithoutFilters?.data?.data?.map((user: any) => {
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
                        <p className="font-semibold text-gray-700">Total Users : {users?.length || 0}</p>
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
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
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
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Phone Number
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    # of Label
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    # of Catalog
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                currentData.length === 0 ? (
                                                    <tr className="w-full">
                                                        <td className="text-center py-4" colSpan={8}>
                                                            No records found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    currentData.map((data: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ManageUserListRow data={data} index={index} currentPage={currentPage}
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
                

                {/* Table */}
            </div>
        </>
    )
}