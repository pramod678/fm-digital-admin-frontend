import * as React from "react";
import LabelTableListRow from "./LabelTableListRow";



export default function LabelTable() {
    const dummyData = [
        {
            id: 1,
            channelName: 'user_001',
            channelUrl: 'John Doe',
            fileDownload: 'johndoe@example.com',
        },
        {
            id: 2,
            channelName: 'user_002',
            channelUrl: 'Jane Smith',
            fileDownload: 'janesmith@example.com',
        },
        // Add more dummy data as needed
    ];

    return (
        <>
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
                                            Channel Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                            Channel URL
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                            B2B/Doc
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        dummyData?.length === 0 ? (
                                            <tr className="w-full">
                                                <td className="text-center py-4" colSpan={8}>
                                                    No records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            dummyData?.map((data: any, index: any) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <LabelTableListRow data={data} index={index} />
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
        </>
    )
}