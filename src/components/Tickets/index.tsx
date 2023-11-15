import * as React from "react";
import ListRow from "./ListRow";
import AddTicket from "./Popups/AddTicket";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";



export default function Index() {

    const tableData = [
        {
            reason: 'Change in Release',
            createdAt: '12/11/2023',
            status:'Done'
        },
        {
            reason: 'Artist Digital Presence',
            createdAt: '12/11/2023',
            status: 'Pending'
        },
        // Add more objects as needed
    ]; 

    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <select className=" px-4 py-2 rounded-md border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option defaultValue="All">All</option>
                        <option value="true">Done</option>
                        <option value="false">Pending</option>
                    </select>
                    <AddTicket userData={userData} />
                </div>
                <p className="text-right text-lg font-semibold text-black mt-2">Total Tickets :100</p>
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
                                                Created At
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 mt-2">
                                        {
                                            tableData.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No tickets found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                tableData.map((data: any, index: any) => {
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
            </div>
        </>
    )
}