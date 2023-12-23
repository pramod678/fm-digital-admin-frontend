import * as React from "react";
import { UserDataApi } from "../../../api/releaseInfo";
import { useNavigate } from "react-router-dom";
import { GetAllLabelsApi } from "../../../api/label";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LabelListRow from "./LabelListRow";



export default function AdminLabelIndex() {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const pageSize = 10; // Number of items per page
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate,)
    const { data: GetAllLabels, isLoading: isLoadingGetAllLabels, isFetching } = GetAllLabelsApi(userData?.users_id)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    React.useEffect(() => {
        if (GetAllLabels?.data?.data) {
            const totalItems = GetAllLabels?.data?.data.length;
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
    }, [GetAllLabels, pageSize]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const dummyData = [
        {
            id: 1,
            userId: 'user_001',
            userName: 'John Doe',
            email: 'johndoe@example.com',
            phone: '12345678',
            Status:1
        },
        // Add more dummy data as needed
    ];

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, GetAllLabels?.data?.data.length);

    return (
        <>
            {(isLoadingGetAllLabels || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2 mb-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg "> Label</p>
                </div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title"
                            defaultValue={""}
                        // onChange={handleFilter}
                        />
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">All</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Pending</option>
                            <option value={2}>Takedown</option>
                            <option value={3}>Corrections</option>
                        </select>
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">UserId</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">Label</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                    </div>


                    <div className="mt-4 sm:mt-0">
                        <p className="font-semibold text-gray-700">Total Labels : 20</p>
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
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 mt-2">
                                            {
                                                dummyData?.length === 0 ? (
                                                    <tr className="w-full">
                                                        <td className="text-center py-4" colSpan={8}>
                                                            No labels found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    dummyData?.map((label: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <LabelListRow label={label} index={index} userData={userData} />
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