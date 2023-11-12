import * as React from "react";
import { YouTubeClaimsDto } from "../../types/tools";
import { useForm } from "react-hook-form";
import { ManageArtistDto } from "../../types/manageArtist";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserDataApi } from "../../api/releaseInfo";



export default function Index() {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<ManageArtistDto>()

    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);
    
    const [ImageDocument, setImageDocument] = React.useState({ preview: "", data: "" });
    const handleFileChange = (e: any) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = {
                    preview: reader.result as string,
                    data: e.target.files[0],
                };
                setImageDocument(img);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const clearImage = (e: any) => {
        e.stopPropagation();
        setImageDocument({ preview: "", data: "" });
    };

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        console.log("newData", newData)
        
    });
    return (
        <>
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Manage Artist</p>
                </div>
                <form onSubmit={(e: any) => {
                    onSubmit(e); e.preventDefault();
                }}>
                    <div className="flex flex-col p-4 justify-center">
                        <div className="relative w-32 h-32">
                            <label className="border-2 border-gray-400 flex items-center justify-center text-gray-500 cursor-pointer w-full h-full">
                                {ImageDocument.preview ? (
                                    <img src={ImageDocument.preview} alt="Selected" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <span className="text-center">Upload</span>
                                    </div>
                                )}
                                <input
                                    id="fileInput"
                                    accept="image/*"
                                    type="file"
                                    name="ImageDocument"
                                    onChange={handleFileChange}
                                    required={true}
                                    className="w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                            {ImageDocument.preview && (
                                <AiOutlineCloseCircle size={20} onClick={clearImage} className="absolute top-0 right-0 m-1 text-red-500 cursor-pointer" />
                            )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Artist Name" htmlFor="grid-artistName" required={true} />
                                <InputField
                                    type="text"
                                    name="artistName"
                                    placeholder="Enter Artist Name"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Artist Name is required."
                                />
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Instagram Id" htmlFor="grid-instagramId" required={true} />
                                <InputField
                                    type="text"
                                    name="instagramId"
                                    placeholder="Enter Instagram Id"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Instagram Id is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Facebook Id" htmlFor="grid-facebookId" required={true} />
                                <InputField
                                    type="text"
                                    name="facebookId"
                                    placeholder="Enter Facebook Id"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Facebook Id is required."
                                />
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Spotify Id" htmlFor="grid-spotifyId" required={true} />
                                <InputField
                                    type="text"
                                    name="spotifyId"
                                    placeholder="Enter Spotify Id"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Spotify Id is required."
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Apple Id" htmlFor="grid-appleId" required={true} />
                                <InputField
                                    type="text"
                                    name="appleId"
                                    placeholder="Apple Id"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Apple Id is required."
                                />
                            </div>

                            <div className="mt-4 w-full flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center"
                                >
                                    <span className="mr-2">Save</span>
                                    <AiFillSave />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}