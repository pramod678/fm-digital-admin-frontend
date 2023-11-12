import * as React from "react";
import InputField from "../../ui/InputField";
import cogoToast from "cogo-toast";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";



export default function Index() {

    const [amount, setAmount] = React.useState(0)

    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const handleSubmit = () => {
        if (amount < 10) {
            cogoToast.error("Minimum value should be 10$")
        }
        //api call
    }

    const data = [
        { report: 'All Stores', Date: '12-12-2023', totalAmount: '$20', status: 'Received' },
        { report: 'All Stores', Date: '10-12-2023', totalAmount: '$10', status: 'Received' },
        { report: 'All Stores', Date: '08-12-2023', totalAmount: '$15', status: 'Received' },
        { report: 'All Stores', Date: '18-12-2023', totalAmount: '$25', status: 'Received' },
    ]

    return (
        <>
            <div className="p-4">
                <div className="shadow-lg w-[60%] md:w-1/3 p-2">
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Earning Amount</p>
                        <p className="font-semibold text-sm sm:text-base">$80</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Approved Amount</p>
                        <p className="font-semibold text-sm sm:text-base">$70</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Requested Amount</p>
                        <p className="font-semibold text-sm sm:text-base">$00</p>
                    </div>
                    <div className="flex justify-between items-center px-2 py-1">
                        <p className="font-semibold text-sm sm:text-base">Available Amount</p>
                        <p className="font-semibold text-sm sm:text-base">$10</p>
                    </div>
                </div>

                <p className="text-sm sm:text-base font-semibold mt-4">Request Amount</p>
                <div className="flex items-center justify-between gap-4 mt-2 bg-gray-100 w-1/2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                        className="w-[80%] px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Enter value"
                    />
                    <button type="button" onClick={handleSubmit} className="w-[20%] px-2 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-600 focus:outline-none focus:ring focus:border-neutral-800">
                        Submit
                    </button>
                </div>
                <p className="text-xs mt-2">Minimum Amount Should be 10$</p>

                <p className="text-sm sm:text-base font-semibold mt-4">Previously Requested</p>
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
                                                Total Amount
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            data?.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No records found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                data?.map((d: any, index: any) => {
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
        </>
    )
}