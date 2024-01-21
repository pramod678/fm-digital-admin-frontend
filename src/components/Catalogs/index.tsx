import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { GetCatalogsApi } from "../../api/catalogs";
import { MdError } from "react-icons/md";
import ListRow from "./ListRow";
import { BounceLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";



export default function Index() {

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [catalogsGet, setcatalogsGet] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState('All');
    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: getCatalogs, isLoading: isLoadinggetCatalogs, isFetching } = GetCatalogsApi(userData.users_id, setcatalogsGet, selectedOption)

    const [records, setRecords] = React.useState(catalogsGet || []);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const PAGE_SIZE = 10 // Number of items per page

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    React.useEffect(() => {
        setRecords(catalogsGet);
        setCurrentPage(1); // Reset to first page when data changes
    }, [catalogsGet]);

    const getCurrentPageData = () => {
        const filteredRecords = filterRecords(records, searchTerm);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return filteredRecords.slice(startIndex, endIndex);
    };

    const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const handleFilter = (event: any) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchTerm(inputValue);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const filterRecords = (data: any[], term: string) => {
        return data.filter(
            (row) =>
                row.Title.toLowerCase().includes(term) ||
                row.ArtistName.toLowerCase().includes(term) ||
                row.Label.toLowerCase().includes(term)
        );
    };

    const currentData = getCurrentPageData();
    const filteredRecords = filterRecords(records, searchTerm);
    const totalPages = Math.ceil(filteredRecords.length / PAGE_SIZE);


    return (
        <>
            {(isLoadinggetCatalogs || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Catalogs</p>
                </div>

                {/* Filters */}
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2  rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title"
                            defaultValue={""}
                            onChange={handleFilter}
                        />
                        <select
                            className="px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setSelectedOption(e.target.value)}
                            value={selectedOption}
                        >
                            <option value="All">All</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={1}>Pending</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                    </div>
                    <div className="">
                        <p className="font-semibold text-gray-700">Total Releases : {getCatalogs?.data?.result?.length || 0}</p>
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
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Album Artwork
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Artist Name
                                                </th>
                                                <th scope="col" className="px-6 py-4 text-left text-xs text-black font-semibold uppercase ">
                                                    Genre
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
                                                <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                currentData?.length === 0 ? (
                                                    <tr className="w-full">
                                                        <td className="text-center py-4" colSpan={8}>
                                                            No records found.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    currentData?.map((catalog: any, index: any) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <ListRow catalog={catalog} index={index} currentPage={currentPage} PAGE_SIZE={PAGE_SIZE} />
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