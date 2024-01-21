import * as React from "react";
import { SlOptionsVertical } from "react-icons/sl";
import useResponsiveIconSize from "../hooks/useResponsiveIconSize";
import { CreateDashboardLinkApi, UpdateDashboardLinkApi } from "../api/releaseInfo";
import cogoToast from "@successtar/cogo-toast";



export default function InputUrl({ data }: { data?: any }) {

    const [isEditing, setIsEditing] = React.useState(false);
    const [readMode, setReadMode] = React.useState(true);
    const [createLink, setCreateLink] = React.useState(data?.dashBoardLink || '')
    const { mutate: UpdateDashboardLink, } = UpdateDashboardLinkApi(setIsEditing, setReadMode)

    const handleSubmit = () => {
        if (createLink) {
            UpdateDashboardLink({ dashBoardLink: createLink, spotify_active: data?.spotify_active, dashBoard_id: data?.dashBoard_id })
        } else {
            cogoToast.error("Link Cannot be empty")
        }
    }

    const size = useResponsiveIconSize()

    return (
        <>
            <div className="bg-gradient-to-br from-[#06b6d4] to-[#34d399] p-4 flex items-center justify-between rounded-md">
                {
                    isEditing ? (
                        <>
                            <input type="text"
                                value={createLink}
                                onChange={(e) => setCreateLink(e.target.value)}
                                className={`border-2 mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${false ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                        </>
                    ) : (
                        <>
                                <p className="text-white break-all">{data?.dashBoardLink?.length > 40 ? data?.dashBoardLink.slice(0, 40) + "..." : data?.dashBoardLink}</p>
                            <SlOptionsVertical className="cursor-pointer text-white" size={size} onClick={() => {
                                setIsEditing(true)
                                setReadMode(false)
                            }} />
                        </>
                    )
                }
            </div>
            <div className="flex justify-end">
                {isEditing && !readMode && (
                    <>
                        <button
                            type="submit"
                            // disabled={isLoadingSongsPost}
                            onClick={handleSubmit}
                            className="bg-neutral-700 hover:bg-neutral-900 mr-3 text-white  font-bold py-2 px-4 rounded sm:text-xs md:text-sm lg:text-base"
                        >
                            {/* {isLoadingSongsPost ? <BeatLoader /> : "Update"} */}
                            Update
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded sm:text-xs md:text-sm lg:text-base"
                            onClick={() => {
                                setIsEditing(false)
                                setReadMode(true)
                            }}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </>
    )
}