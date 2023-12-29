import * as React from "react";
import AdminListRow from "./AdminListRow";


export default function AdminCatalogsList() {

    const dummyData = [
        {
            id: 1,
            title: 'Sample Title 1',
            userId: 'user_001',
            userName: 'John Doe',
            email: 'johndoe@example.com',
            label: 'Label 1',
            numberOfTracks: 5,
            releaseDate: '2023-12-15',
        },
        {
            id: 2,
            title: 'Sample Title 2',
            userId: 'user_002',
            userName: 'Jane Smith',
            email: 'janesmith@example.com',
            label: 'Label 2',
            numberOfTracks: 8,
            releaseDate: '2023-11-20',
        },
        // Add more dummy data as needed
    ];
    return (
        <>
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Catalogs</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-md shadow-md w-full mb-2">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Title"
                            defaultValue={""}
                        // onChange={handleFilter}
                        />
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">All</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={1}>Pending</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">UserId</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                        <select
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        // onChange={(e) => setSelectedOption(e.target.value)}
                        // value={selectedOption}
                        >
                            <option value="All">Label</option>
                            <option value={4}>Approved</option>
                            <option value={0}>Draft</option>
                            <option value={2}>Rejected</option>
                            <option value={3}>Corrections</option>
                        </select>
                        <input
                            type="text"
                            className="px-4 py-2 w-full sm:w-auto rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            id="search"
                            placeholder="Search Cat#"
                            defaultValue={""}
                        // onChange={handleFilter}
                        />
                    </div>


                    <div className="mt-4 sm:mt-0">
                        <p className="font-semibold text-gray-700">Total Releases : 20</p>
                    </div>
                </div>

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
                                            dummyData?.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No records found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                dummyData?.map((catalog: any, index: any) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <AdminListRow catalog={catalog} index={index} />
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


                {/* Table */}
            </div>
        </>
    )
}