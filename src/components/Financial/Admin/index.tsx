import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataApi } from "../../../api/releaseInfo";
import ListRow from "./ListRow";
import cogoToast from "@successtar/cogo-toast";
import AddFundRequest from "../PopUps/AddFundRequest";
import { GetAdminAllFinancialApi } from "../../../api/financial";
import { GetAllUsersDataApi } from "../../../api/user";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BounceLoader } from "react-spinners";



export default function FinancialAdmin(){

    const [amount, setAmount] = React.useState(0)

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")


    const [userId, setUserId] = React.useState('');
    const [statusId, setStatusId] = React.useState('');
    const [financialData, setfinancialData] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate,)
    const { data: GetAdminAllFinancial, isLoading: isLoadingGetAdminAllFinancial, isFetching } = GetAdminAllFinancialApi(userId, statusId)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const { data: allUsersData } = GetAllUsersDataApi();

    const PAGE_SIZE = 25
    React.useEffect(() => {
        if (GetAdminAllFinancial) {
            setfinancialData(GetAdminAllFinancial.data.data);
            setCurrentPage(1);
        }
    }, [GetAdminAllFinancial]);

    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const filterRecords = (data: any, term: any) => {
        return data
    };

    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(financialData, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const slicedRecords = filteredRecords.slice(startIndex, endIndex);
        return { slicedRecords, totalFilteredRecords: filteredRecords.length };
    };

    const { slicedRecords, totalFilteredRecords } = getCurrentPageData();
    const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);



    let totalTransferUserPanel = GetAdminAllFinancial?.data?.data.reduce((sum: any, data: any) => sum + parseFloat(data.user_amount_panel), 0);

    let totalTransferUserBank = GetAdminAllFinancial?.data?.data.reduce((sum: any, data: any) => sum + parseFloat(data.user_amount_bank), 0);


    return (
        <>
            {(isLoadingGetAdminAllFinancial || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">

                <div className="w-1/2 bg-neutral-800 p-2 mb-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Financial Admin</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
                    <div className="shadow-lg p-2 w-full sm:w-1/3">
                        <div className="flex justify-between items-center px-2 py-1">
                            <p className="font-semibold text-sm sm:text-base">Total Fund</p>
                            <p className="font-semibold text-sm sm:text-base">${GetAdminAllFinancial?.data?.total_sum_ammount || 0}</p>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1">
                            <p className="font-semibold text-sm sm:text-base">C Commission</p>
                            <p className="font-semibold text-sm sm:text-base">${GetAdminAllFinancial?.data?.commsion_sum_amount || 0}</p>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1">
                            <p className="font-semibold text-sm sm:text-base">Total Panel Fund</p>
                            <p className="font-semibold text-sm sm:text-base">${GetAdminAllFinancial?.data?.totalpenal_sum_amount || 0}</p>
                        </div>
                        <div className="flex justify-between items-center px-2 py-1">
                            <p className="font-semibold text-sm sm:text-base">Transfered to Users Panel</p>
                            <p className="font-semibold text-sm sm:text-base">${totalTransferUserPanel || 0}</p>
                        </div>

                        <div className="flex justify-between items-center px-2 py-1">
                            <p className="font-semibold text-sm sm:text-base">Transferred to User Bank</p>
                            <p className="font-semibold text-sm sm:text-base">${totalTransferUserBank || 0}</p>
                        </div>
                    </div>

                    <div className="">
                        <AddFundRequest userData={userData} />
                        <Link to={"/UserFinancial"}>
                            <button
                                className="flex items-center text-sm justify-center ml-2 py-2 px-2 bg-[#00CED1] text-white hover:bg-[#00CED1] focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 mb-4 rounded-md"
                            // onClick={() => setIsOpen(true)}
                            >
                                Go to User Payment
                            </button>
                        </Link>
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
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Month date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Earning Resources
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Vendor
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Requested By
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Company Comission
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Total Amount
                                                </th> */}
                                                {/* <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    User Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    User Amount in Panel
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    User Amount in Bank
                                                </th> */}

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                slicedRecords?.length === 0 ? (
                                                    <tr className="w-full">
                                                        <td className="text-center py-4" colSpan={8}>
                                                            No records found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    slicedRecords?.map((d: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ListRow d={d} index={index} />
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