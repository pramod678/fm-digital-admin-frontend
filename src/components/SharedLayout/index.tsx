import * as React from "react";
import useAuthStore from "../../store/userstore";
import Sidebar from "../Sidebar";
import { Outlet } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";

export default function Index() {
    const { isSidebarOpen: isOpen, setSidebarOpen: setIsOpen } = useAuthStore();

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
            {/* Global Mobile Header (Visible only on small screens) */}
            <div className="sm:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 shrink-0">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-1 text-gray-600 hover:text-black transition-colors focus:outline-none"
                    aria-label="Open sidebar"
                >
                    <FiMenu size={26} />
                </button>
                <div className="flex-1 flex justify-center">
                    <img src="/logo.svg" alt="FM Digital" className="h-14 md:h-16 w-auto object-contain scale-110" />
                </div>
                <div className="w-8"></div> {/* Spacer for centering the logo (matches icon approx width) */}
            </div>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="flex-1 overflow-y-auto bg-gray-50 relative">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}