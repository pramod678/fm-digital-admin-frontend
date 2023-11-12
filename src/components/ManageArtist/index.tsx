import * as React from "react";
import ListRow from "./ListRow";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";



export default function Index() {
    const tableData = [
        {
            artistId: '1',
            name: 'John Doe',
            instagramId: 'john_doe_insta',
            facebookId: 'john_doe_facebook',
            spotifyId: 'john_doe_spotify',
            appleId: 'john_doe_apple',
        },
        {
            artistId: '2',
            name: 'Jane Doe',
            instagramId: 'jane_doe_insta',
            facebookId: 'jane_doe_facebook',
            spotifyId: 'jane_doe_spotify',
            appleId: 'jane_doe_apple',
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
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Manage Artist</p>
                </div>
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
                                            tableData.length === 0 ? (
                                                <tr className="w-full">
                                                    <td className="text-center py-4" colSpan={8}>
                                                        No labels found.
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