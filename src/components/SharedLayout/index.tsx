import * as React from "react";
import useAuthStore from "../../store/userstore";
import Sidebar from "../Sidebar";
import { Outlet } from 'react-router-dom';

export default function Index() {
    const { isSidebarOpen: isOpen, setSidebarOpen: setIsOpen } = useAuthStore();

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}