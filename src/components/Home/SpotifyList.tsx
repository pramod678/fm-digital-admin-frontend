import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import InputUrl from "../../ui/InputUrl";



export default function SpotifyList() {

    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("true")
    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any) => {
                    return (
                        <>
                            <iframe src={`${data?.dashBoardLink}`} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="w-full h-52 sm:h-60 object-fit p-1"></iframe>
                        </>
                    )
                })
            }
        </>
    )
}