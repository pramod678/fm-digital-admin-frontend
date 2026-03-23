import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";

export default function AdminYoutubeList() {
    // BACKEND: This fetches admin-specific YouTube recommendations
    // API Endpoint: GET /createRelease/dashBoardLink?admin_spotify=false
    // Expected Response: { data: { data: [{ dashBoardLink: string, title: string, category: string }] } }
    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("false");

    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any, index: number) => {
                    return (
                        <div key={index} className="bg-gradient-to-b from-white to-[#e2dcf9] border border-gray-400 rounded-2xl p-4 shadow-sm flex flex-col gap-3 min-h-[280px]">
                           {/* BACKEND: dashBoardLink should be a YouTube embed URL */}
                           <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/10">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`${data?.dashBoardLink}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>

                            {/* BACKEND: category and title fields from API */}
                            <div className="flex flex-col gap-1">
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                    {data?.category || "Video on Youtube"}
                                </p>
                                <p className="text-sm font-semibold text-gray-800 truncate flex-1">
                                    {data?.title || "Youtube Video"}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}