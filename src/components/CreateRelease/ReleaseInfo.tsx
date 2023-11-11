import * as React from "react";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { ReleaseInfoDto } from "../../types/ReleaseInfo";
import { GetFeaturingArtistApi, GetGenreApi, GetPrimaryArtistApi, ReleaseInfoPostApi, UserDataApi } from "../../api/releaseInfo";
import FeatureArtist from "./PopUps/FeatureArtist";
import SelectGenre from "../../ui/SelectGenre";
import SelectFeatureArtist from "../../ui/SelectFeatureArtist";
import PrimaryArtist from "./PopUps/PrimaryArtist";
import SelectPrimaryArtist from "../../ui/SelectPrimaryArtist";
import { useNavigate, useParams } from "react-router-dom";


export default function ReleaseInfo() {

    const [ImageDocument, setImageDocument] = React.useState({ preview: "", data: "" });
    const { id } = useParams();
    const [userData, setUserData] = React.useState<any>("");
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const items = ['EP', 'Single', 'Album', 'Compilation'];

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<ReleaseInfoDto>()

    const token = localStorage.getItem("token")

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: genre } = GetGenreApi()
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userData?.users_id, setfeaturingArtistGet)
    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id, setprimaryArtistGet)
    const { mutate: ReleaseInfoPost, isLoading: isLoadingReleaseInfoPost } = ReleaseInfoPostApi()

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);


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

    const handleClick = (item: any) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                return prevItems.filter(i => i !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.ImageDocument = ImageDocument.data;
        newData.ReleaseType = selectedItems;
        newData.Status = 0;
        newData.users_id = parseInt(userData.users_id);
        newData.releseInfo_id = id;
        console.log("newData", newData)
    }
    )

    return (
        <>
            <form onSubmit={(e: any) => {
                onSubmit(e);
            }}>
                <div className="flex flex-col md:flex-row gap-4 p-8">
                    {/* Image */}
                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <label className="relative w-32 h-32 border-2 border-gray-400 flex items-center justify-center text-gray-500 cursor-pointer">
                            {ImageDocument.preview ? (
                                <>
                                    <img src={ImageDocument.preview} alt="Selected" className="w-full h-full object-cover" />
                                    <AiOutlineCloseCircle onClick={clearImage} className="absolute top-0 right-0 m-1 text-red-500 cursor-pointer" />
                                </>
                            ) : (
                                <span className="text-center">Upload album artwork</span>
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
                        <div className="text-left">
                            <h6 className="font-bold text-center text-teal-500">Artwork Guidelines</h6>
                            <ul className="list-disc list-inside text-xs">
                                <li>A minimum size of 3000 x 3000 pixels (a perfect square)</li>
                                <li>A minimum resolution of 72dpi (we recommend 300dpi)</li>
                                <li>RGB color mode (CMYK will not show up correctly)</li>
                                <li>JPEG file format</li>
                                <li>Do not send us thumbnails, .png files or images smaller than the requested size.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row items-center sm:sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Release Type" htmlFor="grid-firstName" required={true} />
                                <div className="flex items-center gap-6 px-4 py-1">
                                    {items.map((item, index) => (
                                        <p
                                            key={index}
                                            className={`text-xs sm:text-sm p-2 font-semibold border-2 ${selectedItems.includes(item) ? 'border-blue-500' : 'border-gray-500'} rounded-md cursor-pointer`}
                                            onClick={() => handleClick(item)}
                                        >
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Label Name" htmlFor="grid-labelName" required={true} />
                                <InputField
                                    type="text"
                                    name="LabelName"
                                    placeholder="Enter Label name"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="LabelName is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Release Title" htmlFor="grid-ReleaseTitle" required={true} />
                                <InputField
                                    type="text"
                                    name="ReleaseTitle"
                                    placeholder="Enter Release Title"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="Release Title is required."
                                />
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Release Date" htmlFor="grid-ReleaseDate" required={true} />
                                <InputField
                                    type="date"
                                    name="ReleaseDate"
                                    placeholder="Enter Release Date"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="ReleaseDate is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Primary Artist" htmlFor="grid-PrimaryArtist" required={true} />
                                <div className="flex gap-2 items-center">
                                    <SelectPrimaryArtist control={control} name="PrimaryArtist" options={primaryArtistGet} errors={errors} required={true} />
                                    <PrimaryArtist userData={userData} />
                                </div>
                            </div>

                            <div className="w-full mb-2">
                                <Label text="PLine" htmlFor="grid-PLine" required={true} />
                                <InputField
                                    type="text"
                                    name="PLine"
                                    placeholder="Enter PLine"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="PLine is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={true} />
                                <div className="flex gap-2 items-center">
                                    <SelectFeatureArtist control={control} name="FeaturingArtist" options={featuringArtistGet} errors={errors} required={true} />
                                    <FeatureArtist userData={userData} />
                                </div>
                            </div>

                            <div className="w-full mb-2">
                                <Label text="CLine" htmlFor="grid-CLine" required={true} />
                                <InputField
                                    type="text"
                                    name="CLine"
                                    placeholder="Enter CLine"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="CLine is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Genre" htmlFor="grid-Genre" required={true} />
                                <SelectGenre control={control} name="Genre" options={genre?.data?.data || []} errors={errors} required={true} />
                            </div>

                            <div className="w-full mb-2">
                                <Label text="UPC/EAN" htmlFor="grid-UPC/EAN" required={true} />
                                <InputField
                                    type="number"
                                    name="UPC/EAN"
                                    placeholder="Enter UPC/EAN"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="UPC/EAN is required."
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Sub Genre" htmlFor="grid-SubGenre" required={true} />
                                <InputField
                                    type="text"
                                    name="SubGenre"
                                    placeholder="Enter SubGenre"
                                    register={register}
                                    errors={errors}
                                    requiredMessage="SubGenre is required."
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
                </div>
            </form>
        </>
    )
}