import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { GetCatalogsApi } from "../../api/catalogs";
import { MdError } from "react-icons/md";
import ListRow from "./ListRow";
import { BounceLoader } from "react-spinners";



export default function Index() {

    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const [catalogsGet, setcatalogsGet] = React.useState([]);
    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: getCatalogs, isLoading: isLoadinggetCatalogs, isFetching } = GetCatalogsApi(userData.users_id, setcatalogsGet)

    const [records, setRecords] = React.useState(catalogsGet || []);

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    React.useEffect(() => {
        setRecords(catalogsGet);
    }, [catalogsGet]);


    function handleFilter(event: any) {
        const inputValue = event.target.value || "";
        const filtered = catalogsGet?.filter(
            (row: any) =>
                row.Title.toLowerCase().includes(inputValue) ||
                row.ArtistName.toLowerCase().includes(inputValue) ||
                row.Label.toLowerCase().includes(inputValue)
            // ||row.action.toLowerCase().includes(inputValue)
        );
        setRecords(filtered);
    }


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
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2  rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title"
                            defaultValue={""}
                            onChange={handleFilter}
                        />
                        <select className=" px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option defaultValue="All">All</option>
                            <option value="true">approved</option>
                            <option value="false">Draft</option>
                            <option value="false">corrections</option>
                        </select>
                    </div>
                    <div className="">
                        <p className="font-semibold text-gray-700">Total Releases : {getCatalogs?.data?.result?.length || 0}</p>
                    </div>
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
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Album Artwork
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Artist Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Genre
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Label
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                # of tracks
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Release Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs text-black font-semibold uppercase ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            records?.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No records found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                records?.map((catalog: any, index: any) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <ListRow catalog={catalog} index={index} />
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