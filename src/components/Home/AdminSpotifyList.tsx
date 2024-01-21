import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import InputUrl from "../../ui/InputUrl";



export default function AdminSpotifyList(){

    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("true")
    
    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any) => {
                    return (
                        <>
                            <InputUrl data={data} />
                        </>
                    )
                })
            }
        </>
    )
}