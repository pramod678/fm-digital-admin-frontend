import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import { FaPlay } from "react-icons/fa";

export default function AdminSpotifyList() {
    // BACKEND: This fetches admin-specific Spotify recommendations
    // API Endpoint: GET /createRelease/dashBoardLink?admin_spotify=true
    // Expected Response: { data: { data: [{ dashBoardLink: string, title: string, artist: string }] } }
    const { data: GetDashboardsLinks, isLoading: isLoadingGetDashboardsLinks, isFetching: isFetchingGetDashboardsLinks } = GetDashboardsLinksApi("true");

    const handlePlay = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any, index: number) => {
                    return (
                        <div key={index} className="bg-gradient-to-b from-white to-[#e2dcf9] border border-gray-400 rounded-2xl p-4 shadow-sm flex flex-col justify-between aspect-square relative group hover:shadow-md transition-all">
                             
                             {/* Top Section: Thumbnail & Info */}
                             <div className="flex gap-3">
                                 {/* BACKEND: dashBoardLink should be a Spotify embed URL */}
                                 <div className="w-20 h-20 bg-gray-100 rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                                     <iframe 
                                         src={`${data?.dashBoardLink}`} 
                                         width="100%" 
                                         height="100%" 
                                         frameBorder="0" 
                                         scrolling="no"
                                         style={{ overflow: 'hidden' }}
                                         allow="autoplay; encrypted-media; picture-in-picture"
                                         loading="lazy" 
                                         className="w-full h-full rounded-xl object-cover pointer-events-none"
                                     ></iframe>
                                     <div className="absolute inset-0 bg-transparent"></div>
                                 </div>
                                 
                                 {/* BACKEND: title and artist fields from API */}
                                 <div className="flex flex-col mt-1 overflow-hidden">
                                     <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                                        {data?.title || "Release"}
                                     </h3>
                                     <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mt-0.5 truncate">
                                        {data?.artist || "Artist"}
                                     </p>
                                 </div>
                             </div>

                             {/* Bottom Section: Progress & Controls */}
                             <div className="flex flex-col gap-2 mt-auto">
                                 {/* Progress Bar */}
                                 <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                     <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full w-3/5 rounded-full"></div>
                                 </div>

                                 {/* Time & Play Button */}
                                 <div className="flex items-center justify-between">
                                     <span className="text-xs text-gray-500 font-medium">00:00</span>
                                     <button 
                                         onClick={() => handlePlay(data?.dashBoardLink)}
                                         className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all"
                                     >
                                         <FaPlay size={12} />
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