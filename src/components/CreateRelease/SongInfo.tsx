import * as React from "react";
import SongDetails from "./PopUps/SongDetails";
import { MdClear } from "react-icons/md"
import { AiOutlinePlus } from "react-icons/ai";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";
import { ImCross } from "react-icons/im";
import SongsUpload from "../../ui/SongsUpload";
import { useFieldArray, useForm } from "react-hook-form";
import { SongDetailsDto } from "../../types/ReleaseInfo";


export default function SongInfo() {

    const [AudioDocument, setAudioDocument] = React.useState({ preview: "", data: "" });
    const size = useResponsiveIconSize();
    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { control, register, handleSubmit, getValues } = useForm();


    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const { fields, append, remove, } = useFieldArray({
        control,
        name: "songs",
    });

    const handleRemove = (i: number) => {
        remove(i)
        // setedit(true)
        // seteditIndex(i)
    }

    console.log(fields, "fields")

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
            <div className="p-4 space-y-4">

                {fields?.length === 0 ? (
                    <p className="text-gray-600 text-center text-sm font-semibold">
                        You haven't selected any songs yet
                    </p>
                ) : (
                    <>
                            <div className="flex flex-col items-center">
                                {fields?.map((field: any, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 rounded-md w-full max-w-md">
                                        <div className="flex items-center space-x-4 w-full">
                                            <span className="text-neutral-800 mr-4">{index + 1}.</span>
                                            <p className="text-neutral-800 text-base sm:text-lg font-semibold">{field.Title}</p>
                                            <audio src={URL.createObjectURL(field.AudioDocument)} controls className="w-42 h-8"></audio>
                                        </div>
                                        <button onClick={() => handleRemove(index)} className="text-neutral-700 hover:text-neutral-900 ml-4">
                                            <ImCross size={size} />
                                        </button>
                                    </div>
                                ))}
                            </div>


                    </>

                )}

                <SongDetails userData={userData} append={append} />

            </div>


        </>
    )
}