import * as React from "react";
import EachSong from "./EachSong";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";



export default function AllSongs({ data, userId }: { data: any, userId:any }) {
    

    return (
        <>
            <div className="w-full mx-auto h-full mt-1 overflow-y-auto">
            {
                data?.songInfo?.length > 0 && data?.songInfo?.map((s: any, index:any) => {
                    return (
                        <>
                            <EachSong index={index} data={s} userId={userId} />  
                        </>
                    )
                })
            }
            </div>

        </>
    )
}