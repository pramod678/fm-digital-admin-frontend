import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import Skeleton from "../../ui/Skeleton";

export default function YoutubeList() {
    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("false")
    
    // Combine loading states
    const isLoading = isLoadingGetDashboardsLinks || isFetchingGetDashboardsLinks;

    if (isLoading) {
        return (
            <>
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3 min-h-[280px]">
                       <div className="w-full aspect-video rounded-xl overflow-hidden">
                            <Skeleton className="w-full h-full" />
                       </div>
                       <div className="flex flex-col gap-2 px-1">
                            <Skeleton height={12} width={100} />
                            <div className="flex items-center justify-between gap-4">
                                 <Skeleton height={20} className="flex-1" />
                                 <Skeleton height={24} width={100} className="rounded-full" />
                            </div>
                       </div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any, index: number) => {
                    return (
                        <div key={index} className="bg-gradient-to-b from-white to-[#e2dcf9] border border-gray-400 rounded-2xl p-4 shadow-sm flex flex-col gap-3 min-h-[280px]">
                           <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/10">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`${data?.dashBoardLink}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    className="w-full h-full object-cover" 
                                    allowFullScreen
                                ></iframe>
                           </div>
                           <div className="flex flex-col gap-1 px-1">
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                                    {data?.category || "Video on Youtube"}
                                </p>
                                <div className="flex items-center justify-between gap-4">
                                     <p className="text-sm font-semibold text-gray-800 truncate flex-1">
                                        {data?.title || "Youtube Video"}
                                     </p>
                                     <button className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-700 border border-gray-100 hover:text-purple-600 shadow-sm">
                                        Check full video
                                     </button>
                                </div>
                           </div>
                        </div>
                    )
                })
            }
        </>
    )
}