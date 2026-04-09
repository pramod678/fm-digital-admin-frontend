import { FaCircleInfo } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { IoIosStats, IoMdNotificationsOutline } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";
import { TbDatabaseDollar } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import * as React from "react";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate } from "react-router-dom";
import {
  GetLatestCoorectionsApi,
  GetLatestDraftsApi,
} from "../../api/releaseInfo";
import SpotifyList from "./SpotifyList";
import YoutubeList from "./YoutubeList";
import { GetUserAllUserFinancialApi } from "../../api/financial";
import { AiOutlinePlus } from "react-icons/ai";
import AppHeader from '../SharedLayout/AppHeader';
import Skeleton from "../../ui/Skeleton";

// BACKEND NOTE: Page title can later be derived from backend-driven route config if needed.

export default function UserHome({ userData }: { userData: any }) {
  const size = useResponsiveIconSize();
  const navigate = useNavigate();

  // ========== BACKEND INTEGRATION POINTS ==========
  
  // BACKEND: User Drafts API
  // Endpoint: GET /createRelease/draftGet-all/{userId}
  // Expected Response: {
  //   data: [{
  //     releseInfo_id: string,
  //     ReleaseTitle: string,
  //     ReleaseDate: string
  //   }]
  // }
  const { data: GetLatestDrafts, isLoading: isLoadingGetLatestDrafts } =
    GetLatestDraftsApi(userData?.users_id);
    
  // BACKEND: User Corrections API
  // Endpoint: GET /createRelease/correctionGet-all/{userId}
  // Expected Response: {
  //   data: [{
  //     releseInfo_id: string,
  //     ReleaseTitle: string,
  //     ReleaseDate: string
  //   }]
  // }
  const { data: GetLatestCoorections, isLoading } = GetLatestCoorectionsApi(
    userData?.users_id
  );
  
  // BACKEND: User Financial Summary API
  // Endpoint: GET /admin/user-finacial-get-all?user_id={userId}
  // Expected Response: {
  //   data: {
  //     avlaiable_sum_amount: number,
  //     pending_amount: number,
  //     total_earned: number
  //   }
  // }
  const {
    data: GetUserAllUserFinancial,
    isLoading: isLoadingGetUserAllUserFinancial,
  } = GetUserAllUserFinancialApi(userData?.users_id);

  // Custom actions for user header (rendered before profile)
  const userHeaderExtraActions = (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
      <button 
        onClick={() => navigate('/ReleseInfo')}
        className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-xs font-medium text-gray-700 transition"
      >
        <AiOutlinePlus size={14} /> <span className="hidden sm:inline">Create Release</span>
      </button>
      
      <div className="flex items-center px-2 sm:px-3 py-1.5 bg-purple-50 rounded-md border border-purple-100 text-purple-700 text-xs font-medium">
        <span className="hidden sm:inline">Revenue</span> 
        <span className="sm:ml-1.5 text-gray-800">
           {isLoadingGetUserAllUserFinancial ? (
               <Skeleton width={40} height={16} className="ml-2 inline-block align-middle" />
           ) : (
               `$${GetUserAllUserFinancial?.data?.avlaiable_sum_amount?.toFixed(2) || "0.00"}`
           )}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      <AppHeader title="Homepage" extraActions={userHeaderExtraActions} />
      
      {/* Main Content with padding */}
      <div className="p-4 sm:p-6 flex flex-col gap-8">

      {/* Section 1: Recommended for you (Spotify List) */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Recommended for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
             <div className="contents">
                <SpotifyList />
             </div>
        </div>
      </div>

      {/* Section 2: Spotify recommended song (Youtube List) */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800">Spotify recommended song for you</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
             <div className="contents">
                <YoutubeList />
             </div>
        </div>
      </div>

      {/* Section 3: Status Lists (Corrections & Drafts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        
        {/* Correction Requested */}
        <div className="flex flex-col gap-4">
             <h2 className="text-lg font-bold text-gray-800">Correction requested</h2>
             <div className="flex flex-col gap-3">
                {isLoading ? (
                    // Skeleton Loader for Corrections
                    [1, 2, 3].map((_, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-3">
                            <div className="flex flex-col gap-2 w-full sm:w-2/3">
                                <Skeleton width="80%" height={16} />
                                <Skeleton width="40%" height={12} />
                            </div>
                            <Skeleton width={80} height={28} className="rounded-full" />
                        </div>
                    ))
                ) : GetLatestCoorections?.data?.data?.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">No corrections requested</div>
                ) : (
                    GetLatestCoorections?.data?.data?.map((name: any) => (
                        <div key={name.releseInfo_id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#f0ebff] to-[#e2dcf9] rounded-xl gap-3">
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm">{name.ReleaseTitle}</span>
                                <span className="text-xs text-gray-600 mt-0.5">{name.ReleaseDate}</span>
                            </div>
                            <button 
                                onClick={() => navigate(`/ReleseInfoUpdate/${name?.releseInfo_id}`)}
                                className="px-4 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm hover:shadow hover:text-purple-600 transition w-fit"
                            >
                                Edit Here
                            </button>
                        </div>
                    ))
                )}
             </div>
        </div>

        {/* Drafts */}
        <div className="flex flex-col gap-4">
             <h2 className="text-lg font-bold text-gray-800">Drafts</h2>
             <div className="flex flex-col gap-3">
                {isLoadingGetLatestDrafts ? (
                     // Skeleton Loader for Drafts
                    [1, 2, 3].map((_, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-3">
                            <div className="flex flex-col gap-2 w-full sm:w-2/3">
                                <Skeleton width="80%" height={16} />
                                <Skeleton width="40%" height={12} />
                            </div>
                            <Skeleton width={80} height={28} className="rounded-full" />
                        </div>
                    ))
                ) : GetLatestDrafts?.data?.data?.length === 0 ? (
                    <div className="py-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">No drafts available</div>
                ) : (
                    GetLatestDrafts?.data?.data?.map((name: any) => (
                        <div key={name.releseInfo_id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#f0ebff] to-[#e2dcf9] rounded-xl gap-3">
                             <div className="flex flex-col">
                                <span className="font-semibold text-gray-800 text-sm">{name.ReleaseTitle}</span>
                                <span className="text-xs text-gray-600 mt-0.5">{name.ReleaseDate}</span>
                            </div>
                             <button 
                                onClick={() => navigate(`/ReleseInfoUpdate/${name?.releseInfo_id}`)}
                                className="px-4 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm hover:shadow hover:text-purple-600 transition w-fit"
                            >
                                Edit Here
                            </button>
                        </div>
                    ))
                )}
             </div>
        </div>

      </div>

      </div>
    </div>
  );
}
