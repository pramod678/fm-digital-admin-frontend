import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";



export default function YoutubeList() {

    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("false")
    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any) => {
                    return (
                        <>
                            <iframe width="560" height="315" src={`${data?.dashBoardLink}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="w-full h-52 sm:h-80 object-fit p-1" allowFullScreen></iframe>
                        </>
                    )
                })
            }
        </>
    )
}