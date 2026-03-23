import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaFileAlt, FaTicketAlt, FaMoneyBillWave, FaTag, FaUsers } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GetDashBoardStatsApi } from '../../api/releaseInfo';
import { GetAdminAllUserFinancialApi } from '../../api/financial';
import AdminSpotifyList from './AdminSpotifyList';
import AdminYoutubeList from './AdminYoutubeList';
import AppHeader from '../SharedLayout/AppHeader';

// BACKEND NOTE: Page title can later be derived from backend-driven route config if needed.

export default function AdminHome({ userData }: { userData: any }) {
    const navigate = useNavigate();
    
    // ========== BACKEND INTEGRATION POINTS ==========
    
    // BACKEND: Admin Dashboard Stats API
    // Endpoint: GET /admin/dashBoard-get-all
    // Expected Response: {
    //   data: {
    //     pendingRelese: number,
    //     pendingLabel: number,
    //     totalArtist: number,
    //     pendingFinancial: number,
    //     pendingTickets: number,
    //     totalUsers: number
    //   }
    // }
    const { data: GetDashBoardStats, isLoading: isLoadingStats } = GetDashBoardStatsApi();
    
    // BACKEND: Admin Financial Summary API
    // Endpoint: GET /admin/user-finacial-get-all
    // Expected Response: {
    //   data: {
    //     total_revenue: number,
    //     pending_amount: number,
    //     approved_amount: number
    //   }
    // }
    const { data: GetAdminFinancial, isLoading: isLoadingFinancial } = GetAdminAllUserFinancialApi("admin");

    // KPI card data matching mockup order
    const kpiCards = [
        {
            title: "Pending Catalogs",
            count: GetDashBoardStats?.data?.data?.pendingRelese || 0,
            icon: FaFileAlt,
            route: '/Catalogs'
        },
        {
            title: "Pending Tickets",
            count: GetDashBoardStats?.data?.data?.pendingTickets || 0,
            icon: FaTicketAlt,
            route: '/Tickets'
        },
        {
            title: "Payment Requests",
            count: GetDashBoardStats?.data?.data?.pendingFinancial || 0,
            icon: FaMoneyBillWave,
            route: '/Financial'
        },
        {
            title: "Pending Labels",
            count: GetDashBoardStats?.data?.data?.pendingLabel || 0,
            icon: FaTag,
            route: '/Label'
        },
        {
            title: "Total Users",
            count: GetDashBoardStats?.data?.data?.totalUsers || 0,
            icon: FaUsers,
            route: '/ManageArtist'
        }
    ];

    // Custom actions for admin header (rendered before profile)
    const adminHeaderExtraActions = (
        <div className="flex items-center gap-3">
            <button 
                onClick={() => navigate('/ReleseInfo')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 text-xs font-medium text-gray-700 transition"
            >
                <AiOutlinePlus size={14} /> Create Release
            </button>
            
            <div className="flex items-center px-3 py-1.5 bg-purple-50 rounded-md border border-purple-100 text-purple-700 text-xs font-medium">
                Revenue <span className="ml-1.5 text-gray-800">${GetAdminFinancial?.data?.total_revenue?.toFixed(2) || "0.00"}</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto bg-white">
            <AppHeader title="Homepage" extraActions={adminHeaderExtraActions} />

            {/* Main Content with padding */}
            <div className="p-6 flex flex-col gap-8">

            {/* KPI Summary Row - 5 Cards Horizontal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpiCards.map((kpi, index) => {
                    const IconComponent = kpi.icon;
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(kpi.route)}
                            className="bg-white border border-purple-200 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all"
                        >
                            <IconComponent className="text-purple-500 text-3xl" />
                            <div className="text-4xl font-bold text-gray-800 text-center">
                                {kpi.count}
                            </div>
                            <div className="text-sm text-gray-600 text-center font-medium">
                                {kpi.title}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Section 1: Recommended for you */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Recommended for you</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                        <MdEdit size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AdminSpotifyList />
                </div>
            </div>

            {/* Section 2: Spotify recommended song for you */}
            <div className="flex flex-col gap-4 pb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Spotify recommended song for you</h2>
                    <button className="text-gray-400 hover:text-gray-600 transition">
                        <MdEdit size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdminYoutubeList />
                </div>
            </div>

            </div>
        </div>
    );
}
