import * as React from "react";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { GetPrimaryArtistApi, UserDataApi } from "../../api/releaseInfo";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BounceLoader } from "react-spinners";



const Index = () => {
    const [userData, setUserData] = React.useState<any>("");
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const pageSize = 10; // Number of items per page
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate);
    const { data: GetPrimaryArtist, isLoading, isFetching } = GetPrimaryArtistApi(userData.users_id);

    React.useEffect(() => {
        getUserData({ token: token });
    }, []);

    React.useEffect(() => {
        if (GetPrimaryArtist?.data?.data) {
            const totalItems = GetPrimaryArtist?.data?.data.length;
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
    }, [GetPrimaryArtist, pageSize]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, GetPrimaryArtist?.data?.data.length);


    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="p-4">
                <div className="w-1/2 mb-4 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Manage Artist</p>
                </div>
                {/* <div className="flex justify-end items-center p-4 bg-gray-100 my-3 rounded-md shadow-md w-full">
                    
                    <div className="">
                        <p className="font-semibold text-gray-700">Total Releases : {GetPrimaryArtist?.data?.data?.length || 0}</p>
                    </div>
                </div> */}
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Artist Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Instagram Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Facebook Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Spotify Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Apple Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 mt-2">
                                        {
                                            GetPrimaryArtist?.data?.data.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No labels found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                GetPrimaryArtist?.data?.data.slice(startIndex, endIndex)?.map((data: any, index: any) => {
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
export default Index;