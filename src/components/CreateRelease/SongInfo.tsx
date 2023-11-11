import * as React from "react";
import SongDetails from "./PopUps/SongDetails";



export default function SongInfo() {
    return (
        <>
            <p className="text-center font-semibold mt-4">Upload Assets</p>
            <p className="text-left font-semibold mt-4 text-teal-400 ml-4">Audio File GuideLines</p>
            <div className="p-4">
                <div className="flex items-center justify-center w-full border-2 border-teal-500 h-40">
                    <SongDetails/>
                </div>
            </div>
        </>
    )
}