import * as React from "react";
import ReleaseInfo from "./ReleaseInfo";
import SongInfo from "./SongInfo";


export default function Index() {

    const [activeTab, setActiveTab] = React.useState("Release Info");

    const handleTabClick = (name:any) => {
        setActiveTab(name);
    };
    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {['Release Info', 'Song Info', 'Platform', 'Submission'].map((r, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${activeTab === r ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                            onClick={() => handleTabClick(r)}
                        >
                            {r}
                        </button>
                    ))}
                </div>

            </div>

            {
                activeTab === 'Release Info' && <ReleaseInfo />
            }
            {
                activeTab === 'Song Info' && <SongInfo />
            }
        </>
    )
}