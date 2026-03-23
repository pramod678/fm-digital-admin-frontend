import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import useAuthStore from "../../store/userstore";

interface AppHeaderProps {
  title: string;
  extraActions?: React.ReactNode;
  showProfile?: boolean;
  showNotifications?: boolean;
}

export default function AppHeader({ 
  title, 
  extraActions, 
  showProfile = true,
  showNotifications = true
}: AppHeaderProps) {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  // BACKEND NOTE: userData should come from authentication context/API
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userType = localStorage.getItem('userType') || 'user';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/sign-in');
  };

  const { isSidebarOpen, toggleSidebar } = useAuthStore();

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb/Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaChevronRight className="text-gray-400 text-[10px]" />
            <span className="typo-page-title text-gray-600">{title}</span>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Custom actions passed from page */}
          {extraActions}

          {/* Optional notification bell */}
          {showNotifications && (
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
              <IoMdNotificationsOutline size={20} />
            </button>
          )}

          {/* Standard profile dropdown */}
          {showProfile && (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-1.5 hover:bg-gray-50 rounded-full p-1 transition"
              >
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center typo-table-cell-strong text-gray-600 border border-gray-300">
                  {userData?.fname?.[0] || (userType === 'admin' ? "A" : "U")}{userData?.lname?.[0] || ""}
                </div>
                <FaChevronDown size={10} className="text-gray-400" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 overflow-hidden">
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 mb-1">
                    <p className="typo-stat-title tracking-wider">Logged in as</p>
                    <p className="typo-table-cell-strong capitalize">{userType}</p>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-left px-3 py-2 typo-table-cell hover:bg-gray-50"
                  >
                    Profile
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 typo-table-cell text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
