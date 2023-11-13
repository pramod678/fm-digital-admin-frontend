import * as React from "react";
import SongDetails from "./PopUps/SongDetails";
import { MdClear } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { ImCross } from "react-icons/im";


export default function SongInfo() {

    const [AudioDocument, setAudioDocument] = React.useState({ preview: "", data: "" });
    const size = useResponsiveIconSize();
    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const handleFileChange = (e: any) => {
        const Audio = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setAudioDocument(Audio);
    };

    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const [divs, setDivs] = React.useState([{}]); // Initialize with one div

    const addDiv = () => {
        setDivs([...divs, {}]); // Add a new div
    };

    const removeDiv = (index: number) => {
        // Ensure that the first div is not removable
        if (index === 0) {
            return;
        }
        setDivs(divs.filter((_, i) => i !== index)); // Remove the div at the specified index
    };

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]


    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        <Link to={`/${r.route}`}>
                            <button
                                key={index}
                                type="button"
                                className={`text-left text-sm md:text-base pl-1 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Song Info" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                            >
                                {r.name}
                            </button>
                        </Link>
                    ))}
                </div>

            </div>

            <p className="text-center font-semibold mt-4">Upload Assets</p>
            <p className="text-left font-semibold mt-4 text-teal-400 ml-4">Audio File GuideLines</p>
            <div className="p-4">
                <div className="flex flex-col gap-4 w-full border-2 border-teal-500 p-4">
                    {divs.map((_, index) => (
                        <>
                            <div className="flex items-center justify-center gap-4">
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
                                <SongDetails userData={userData} />
                                <button
                                    className="flex items-center justify-center ml-2 py-1 px-1 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    onClick={() => removeDiv(index)}
                                >
                                    <ImCross size={size} />
                                </button>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}