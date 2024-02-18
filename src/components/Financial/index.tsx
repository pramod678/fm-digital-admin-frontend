import * as React from "react";
import InputField from "../../ui/InputField";
import cogoToast from "@successtar/cogo-toast";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { GetAllUsersDataApi } from "../../api/user";
import { GetAdminAllFinancialApi, GetUserAllUserFinancialApi, UserFinancialPostApi } from "../../api/financial";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



export default function Index() {

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
    const { data: GetUserAllUserFinancial, isLoading: isLoadingGetUserAllUserFinancial, isFetching } = GetUserAllUserFinancialApi(userData?.users_id, statusId)




    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const { data: allUsersData } = GetAllUsersDataApi();

    const PAGE_SIZE = 25
    React.useEffect(() => {
        if (GetUserAllUserFinancial) {
            setfinancialData(GetUserAllUserFinancial.data.data);
            setCurrentPage(1);
        }
    }, [GetUserAllUserFinancial]);

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

    const handleAmount = () => {
        setAmount(0)
    }

    const { mutate: UserFinancialPost, isLoading: isLoadingUserFinancialPost } = UserFinancialPostApi({ handleAmount })

    const handleSubmit = () => {
        if (amount > 0) {
            let data = {
                users_id: userData?.users_id,
                requested_amount: amount
            }
            UserFinancialPost(data)
        }
        else {
            cogoToast.info("Amount should be greater than 1")
        }
    }

    const { slicedRecords, totalFilteredRecords } = getCurrentPageData();
    const totalPages = Math.ceil(totalFilteredRecords / PAGE_SIZE);


    return (
        <>
            <div className="p-4">
                <div className="shadow-lg w-[60%] md:w-1/3 p-2">
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Earning Amount</p>
                        <p className="font-semibold text-sm sm:text-base">${GetUserAllUserFinancial?.data?.earning_sum_amount}</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Approved Amount</p>
                        <p className="font-semibold text-sm sm:text-base">${GetUserAllUserFinancial?.data?.approved_sum_amount}</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Requested Amount</p>
                        <p className="font-semibold text-sm sm:text-base">${GetUserAllUserFinancial?.data?.requested_sum_amount}</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Available Amount</p>
                        <p className="font-semibold text-sm sm:text-base">${GetUserAllUserFinancial?.data?.avlaiable_sum_amount}</p>
                    </div>
                </div>

                <p className="text-sm sm:text-base font-semibold mt-4">Request Amount</p>
                <div className="flex items-center justify-between gap-4 mt-2 bg-gray-100 sm:w-1/2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                        className="w-[80%] px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter value"
                    />
                    <button type="button" onClick={handleSubmit}
                        className="w-[20%] px-2 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-600 focus:outline-none focus:ring focus:border-neutral-800">
                        Submit
                    </button>
                </div>
                <p className="text-xs mt-2">Minimum Amount Should be 10$</p>

                <p className="text-sm sm:text-base font-semibold mt-4">Previously Requested</p>
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
                                                    Report
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Requested Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Approved Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Earning Amount
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Status
                                                </th>
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
                                                            <>
                                                                {
                                                                    d?.earning_amount === 0 && <React.Fragment key={index}>
                                                                        <ListRow d={d} index={index} />
                                                                    </React.Fragment>
                                                                }
                                                            </>
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