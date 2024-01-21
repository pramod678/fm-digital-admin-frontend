import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import InputUrl from "../../ui/InputUrl";



export default function AdminYoutubeList() {

    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("false")
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