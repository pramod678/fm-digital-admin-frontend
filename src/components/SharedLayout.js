import { useState } from 'react';
import Navbar from './NavBar';
import SideBar from './Sidebar/SideBar';
import { Outlet } from 'react-router-dom';


const SharedLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <div className="h-full">
                    <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <div className={`flex-grow flex flex-col`}>
                    <div>
                        <Navbar />
                    </div>
                    <div className="p-3 md:p-5 overflow-y-auto h-screen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SharedLayout;
