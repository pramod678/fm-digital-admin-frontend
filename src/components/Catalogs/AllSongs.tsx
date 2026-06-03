import * as React from "react";
import EachSong from "./EachSong";
import { GetAdminCatalogSongsApi } from "../../api/catalogs";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



export default function AllSongs({ data, userId }: { data: any, userId:any }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const PAGE_SIZE = 25;

    const { data: songsData, isLoading, isFetching } = GetAdminCatalogSongsApi(userId, data?.releaseInfo_id, currentPage, PAGE_SIZE);
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const slicedRecords = songsData?.data?.data || [];
    const pagination = songsData?.data?.pagination;
    const totalPages = pagination?.totalPages || 0;

    return (
        <>
            {(isLoading || isFetching) && (
                <div className="flex justify-center items-center h-full w-full">
                    <BounceLoader size={50} color={"#000000"} />
                </div>
            )}
            <div className="w-full mx-auto h-full mt-1 flex flex-col">
                <div className="flex-grow overflow-y-auto">
                {
                    slicedRecords?.length > 0 ? slicedRecords.map((s: any, index:any) => {
                        return (
                            <React.Fragment key={index}>
                                <EachSong index={index} data={s} userId={userId} />  
                            </React.Fragment>
                        )
                    }) : !isLoading && !isFetching && <p className="text-center mt-4">No songs found.</p>
                }
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-end items-center mt-2 pt-2 border-t border-gray-200">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-1 rounded-md bg-neutral-700 text-gray-600 hover:bg-neutral-800 disabled:opacity-50 mx-1"
                        >
                            <FiChevronLeft color="white" size={16} />
                        </button>
                        <span className="text-xs text-gray-600 mx-2">{`Page: ${currentPage}/${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded-md bg-neutral-700 text-gray-600 hover:bg-neutral-800 disabled:opacity-50 mx-1"
                        >
                            <FiChevronRight color="white" size={16} />
                        </button>
                    </div>
                )}
            </div>

        </>
    )
}