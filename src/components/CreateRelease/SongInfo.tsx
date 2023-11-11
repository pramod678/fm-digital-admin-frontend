import * as React from "react";
import SongDetails from "./PopUps/SongDetails";
import { MdClear } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";


export default function SongInfo() {

    const [AudioDocument, setAudioDocument] = React.useState({ preview: "", data: "" });
    const size = useResponsiveIconSize();
    const handleFileChange = (e: any) => {
        // console.log("handleFileChange");
        const Audio = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setAudioDocument(Audio);
        // console.log(img,"img");
    };

    const [divs, setDivs] = React.useState([{}]); // Initialize with one div

    const addDiv = () => {
        setDivs([...divs, {}]); // Add a new div
    };

    const removeDiv = (index: number) => {
        setDivs(divs.filter((_, i) => i !== index)); // Remove the div at the specified index
    };


    return (
        <>
            <p className="text-center font-semibold mt-4">Upload Assets</p>
            <p className="text-left font-semibold mt-4 text-teal-400 ml-4">Audio File GuideLines</p>
            <div className="p-4">
                {divs.map((_, index) => (
                    <div key={index} className="flex items-center justify-center w-full border-2 border-teal-500 h-40">
                        <input
                            accept="audio/*"
                            type="file"
                            name="AudioDocument"
                            onChange={(event) => handleFileChange(event)}
                            multiple
                        />
                        <button
                            className="flex items-center justify-center ml-2 py-1 px-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                            onClick={addDiv}
                        >
                            <AiOutlinePlus size={size} />
                        </button>
                        <SongDetails />
                        <button
                            className="flex items-center justify-center ml-2 py-1 px-1 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                            onClick={() => removeDiv(index)}
                        >
                            <MdClear size={size} />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}