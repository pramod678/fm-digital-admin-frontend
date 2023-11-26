import * as React from "react";
import ListRow from "./ListRow";
import AddTicket from "./Popups/AddTicket";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { GetAllTicketApi } from "../../api/ticket";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



export default function Index() {


    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const pageSize = 10; // Number of items per page
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: GetAllTicket, isLoading: isLoadingGetAllTicket, isFetching } = GetAllTicketApi()

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    React.useEffect(() => {
        if (GetAllTicket?.data?.data) {
            const totalItems = GetAllTicket?.data?.data.length;
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
    }, [GetAllTicket, pageSize]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, GetAllTicket?.data?.data.length);

    return (
        <>
            {(isLoadingGetAllTicket || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <select className=" px-4 py-2 rounded-md border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option defaultValue="All">All</option>
                        <option value="true">Done</option>
                        <option value="false">Pending</option>
                    </select>
                    <AddTicket userData={userData} />
                </div>
                <p className="text-right text-lg font-semibold text-black mt-2">Total Tickets :{GetAllTicket?.data?.data?.length}</p>
                <div className="p-2 bg-neutral-500 my-4">
                    <p className="text-center text-white">Due to high traffic of tickets, the response may vary from 24 hours to 1 week</p>
                </div>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Reason
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Description
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 mt-2">
                                        {
                                            GetAllTicket?.data?.data?.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No tickets found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                    GetAllTicket?.data?.data?.slice(startIndex, endIndex)?.map((data: any, index: any) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <ListRow data={data} index={index} />
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