import * as React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";


export default function Index({ children }: { children: any }) {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <div className="h-full">
                <Navbar />
                <div className="flex w-[100vw]">
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    {/* <div className={`h-[92vh] p-4 overflow-y-auto`}>
                        {children}
                    </div> */}
                </div>

            </div>
        </>
    )
}