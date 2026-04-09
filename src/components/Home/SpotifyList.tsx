import * as React from "react";
import { GetDashboardsLinksApi } from "../../api/releaseInfo";
import { FaPlayCircle } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import Skeleton from "../../ui/Skeleton";

export default function SpotifyList() {
    const { data: GetDashboardsLinks, isLoading } = GetDashboardsLinksApi("true")

    const handlePlay = (link: string) => {
        if(link) window.open(link, '_blank');
    };

    if (isLoading) {
        return (
            <>
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-2 sm:p-4 shadow-sm flex flex-col justify-between aspect-square relative">
                        <div className="flex gap-2 sm:gap-3">
                            <Skeleton className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl flex-shrink-0" />
                            <div className="flex flex-col flex-1 gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                                <Skeleton height={16} width="80%" />
                                <Skeleton height={10} width="50%" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            <Skeleton height={6} width="100%" className="rounded-full" />
                            <div className="flex items-center justify-between mt-1">
                                <Skeleton height={12} width={30} />
                                <Skeleton height={32} width={32} variant="circular" />
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            {
                GetDashboardsLinks?.data?.data?.map((data: any, index: number) => {
                    return (
                        <div key={index} className="bg-gradient-to-b from-white to-[#e2dcf9] border border-gray-400 rounded-2xl p-2 sm:p-4 shadow-sm flex flex-col justify-between aspect-square relative group hover:shadow-md transition-all">
                             
                             {/* Top Section: Thumbnail & Info */}
                             <div className="flex gap-2 sm:gap-3">
                                 {/* Thumbnail Placeholder - Using Iframe as the Thumbnail Image */}
                                 <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gray-100 rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden relative">
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
                                     {/* Overlay to catch clicks if we want it to be just a visual */}
                                     <div className="absolute inset-0 bg-transparent"></div>
                                 </div>
                                 
                                 {/* Text Info */}
                                 <div className="flex flex-col mt-0.5 sm:mt-1 overflow-hidden">
                                     <h3 className="font-bold text-gray-900 text-sm sm:text-lg leading-tight truncate">
                                        {data?.title || "Release"}
                                     </h3>
                                     <p className="text-gray-600 text-[10px] font-medium uppercase tracking-wider mt-0.5 truncate">
                                        {data?.artist || "Artist"}
                                     </p>
                                 </div>
                             </div>

                             {/* Bottom Section: Controls */}
                             <div className="flex flex-col gap-2 mt-auto">
                                 {/* Waveform / Progress Line */}
                                 <div className="flex items-center gap-2">
                                     <div className="w-full h-1 bg-gray-300/50 rounded-full overflow-hidden">
                                         <div className="h-full w-[40%] bg-gray-800 rounded-full"></div>
                                     </div>
                                 </div>

                                 {/* Timers & Play Button */}
                                 <div className="flex items-center justify-between mt-0.5 sm:mt-1">
                                     <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
                                         <span className="text-[9px] sm:text-[10px] font-mono">00:00</span>
                                         <BiDotsHorizontalRounded size={16} className="cursor-pointer hover:text-gray-800 sm:w-5 sm:h-5" />
                                     </div>
                                     
                                     <button 
                                        onClick={() => handlePlay(data?.dashBoardLink)}
                                        className="text-gray-900 hover:scale-110 transition-transform focus:outline-none"
                                     >
                                         <FaPlayCircle size={24} className="sm:w-8 sm:h-8" />
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