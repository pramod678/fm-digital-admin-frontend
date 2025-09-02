import * as React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Outlet } from 'react-router-dom';


export default function Index() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <div className="h-full">
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="flex ">
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className={`h-[92vh] overflow-y-auto w-full `}>
                        <Outlet/>
                    </div>
                </div>

            </div>
        </>
    )
}