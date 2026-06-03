import * as React from "react";
import ManageCatalogsListRow from "./ManageCatalogsListRow";
import { useParams } from "react-router-dom";
import { GetAdminReleaseCatalogsApi } from "../../../api/catalogs";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Pagination from "../../../ui/Pagination";


export default function ManageCatalogsList() {

    const { id } = useParams();
    const PAGE_SIZE = 25;

    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);

    const { data: getCatalogs, isLoading: isLoadingGetCatalogs, isFetching } = GetAdminReleaseCatalogsApi(id || '', '', currentPage, PAGE_SIZE, searchTerm);

    // Reset to first page when search changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
    };

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const slicedRecords = getCatalogs?.data?.data || [];
    const pagination = getCatalogs?.data?.pagination;
    const totalFilteredRecords = pagination?.totalItems || 0;
    const totalPages = pagination?.totalPages || 0;


    return (
        <>
            {(isLoadingGetCatalogs || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg">
                        Manage User <span className="text-white">{'>'}</span> Catalog
                    </p>

                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title, Label"
                            defaultValue={""}
                            onChange={handleFilter}
                        />
                    </div>


                    <div className="mt-4 sm:mt-0">
                        <p className="font-semibold text-gray-700">Total Releases : {totalFilteredRecords || 0}</p>
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
                                                    Title
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
                                                    Label
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    # of tracks
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Release Date
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
                                                    slicedRecords?.map((catalog: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ManageCatalogsListRow catalog={catalog} index={index} currentPage={currentPage}
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

                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </div>

                {/* Table */}
            </div>
        </>
    )
}