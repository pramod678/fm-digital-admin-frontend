import * as React from "react";
import LabelTableListRow from "./LabelTableListRow";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



export default function LabelTable({ labelData }: { labelData: any }) {

    const [currentPage, setCurrentPage] = React.useState(1);
    const PAGE_SIZE = 1

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };


    const getCurrentPageData = () => {

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const slicedRecords = labelData.slice(startIndex, endIndex);
        return { slicedRecords };
    };

    const { slicedRecords } = getCurrentPageData();
    const totalPages = Math.ceil(slicedRecords / PAGE_SIZE);

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
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        labelData?.length === 0 ? (
                                            <tr className="w-full">
                                                <td className="text-center py-4" colSpan={8}>
                                                    No records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {
                                                    labelData?.map((data: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <LabelTableListRow data={data} index={index} />
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </>
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

        </>
    )
}