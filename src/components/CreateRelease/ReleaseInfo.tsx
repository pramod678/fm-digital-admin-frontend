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
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../ui/ImageUpload";


export default function ReleaseInfo() {

    const { id } = useParams();
    const [userData, setUserData] = React.useState<any>("");
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState("");
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
    const [file, setFile] = React.useState(null);
    const token = localStorage.getItem("token")

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: genre } = GetGenreApi()
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userData?.users_id)
    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id)
    const { mutate: ReleaseInfoPost, isLoading: isLoadingReleaseInfoPost } = ReleaseInfoPostApi(navigate)

    const tabs = [
        { name: 'Release Info', route: 'ReleseInfo' },
        { name: 'Song Info', route: 'Songsinfo' },
        { name: 'Platform', route: 'Platform' },
        { name: 'Submission', route: 'Submission' },
    ]

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const handleClick = (item: any) => {
        setSelectedItems(item);
    };

    var today = new Date();
    var targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 6); // Adding 5 days

    function isPastTargetDate() {
        var currentDate = new Date();
        return currentDate >= targetDate;
    }
    if (isPastTargetDate()) {
        // Perform your action or hide the content here
        let month: any = targetDate.getMonth() + 1;
        let year = targetDate.getUTCFullYear() - 0;
        let tdate: any = targetDate.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (tdate < 10) {
            tdate = "0" + tdate;
        }
        var maxDate = year + "-" + month + "-" + tdate;

    } else {
        // The target date has not been reached yet
        let month: any = targetDate.getMonth() + 1;
        let year = targetDate.getUTCFullYear() - 0;
        let tdate: any = targetDate.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (tdate < 10) {
            tdate = "0" + tdate;
        }
        var maxDate1 = year + "-" + month + "-" + tdate;

    }

    function toTitleCase(str: string) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        
        let formData: any = new FormData();
        formData.append("ImageDocument", file);
        formData.append("ReleaseType", selectedItems);
        formData.append("ReleaseTitle", toTitleCase(newData.ReleaseTitle));
        formData.append("PrimaryArtist", newData.PrimaryArtist);
        formData.append("FeaturingArtist", newData.FeaturingArtist);
        formData.append("Genre", newData.Genre);
        formData.append("SubGenre", toTitleCase(newData.SubGenre));
        formData.append("LabelName", toTitleCase(newData.LabelName));
        formData.append("ReleaseDate", newData.ReleaseDate);
        formData.append("PLine", toTitleCase(newData.PLine));
        formData.append("CLine", toTitleCase(newData.CLine));
        formData.append("UPCEAN", newData.UPCEAN);
        // @ts-ignore
        formData.append("users_id", parseInt(userData.users_id));
        // @ts-ignore
        formData.append("Status", parseInt(0));
        ReleaseInfoPost(formData)
    }
    )
    return (
        <>
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        // <Link to={`/${r.route}`}>
                        <button
                            key={index}
                            type="button"
                            className={`text-left text-sm md:text-base pl-2 md:pl-3 lg:pl-4 pr-4 md:pr-16 lg:pr-32 py-2 font-semibold ${r?.name === "Release Info" ? 'border-b-4 border-teal-400 bg-gray-200' : 'border-b-4 border-gray-200'} `}
                        >
                            {r.name}
                        </button>
                        // </Link>
                    ))}
                </div>
            </div>

            <form onSubmit={(e: any) => {
                onSubmit(e);
            }}>
                <div className="flex flex-col md:flex-row gap-4 px-8 py-4">
                    {/* Image */}
                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <FileUpload file={file} setFile={setFile} />
                        <div className="text-left">
                            <h6 className="font-bold text-center text-teal-500">Artwork Guidelines</h6>
                            <ul className="list-disc list-inside text-xs">
                                <li>Files accepeted are .png, JPEG files</li>
                                <li>File size should be up to 2MB.</li>
                                <li>For optimal results, ensure the image dimensions are N x N pixels.(eg :1000 x 1000 , 2000 x 2000)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full sm:gap-8">
                        <div className="w-full">
                            <div className="w-full mb-2">
                                <Label text="Release Type" htmlFor="grid-firstName" required={true} />
                                <div className="flex flex-wrap items-center gap-6 px-4 py-1">
                                    {items.map((item, index) => (
                                        <p
                                            key={index}
                                            className={`text-xs sm:text-sm p-2 font-semibold border-2 ${selectedItems === item ? 'bg-neutral-800 text-white' : 'border-gray-500'} rounded-md cursor-pointer`}
                                            onClick={() => handleClick(item)}
                                        >
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>

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
                                <Label text="Primary Artist" htmlFor="grid-PrimaryArtist" required={true} />
                                <div className="flex gap-2 items-center">
                                    <SelectPrimaryArtist control={control} name="PrimaryArtist" errors={errors} required={true} id={userData?.users_id} />
                                    <PrimaryArtist userData={userData} />
                                </div>
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={false} />
                                <div className="flex gap-2 items-center">
                                    <SelectFeatureArtist control={control} name="FeaturingArtist" errors={errors} required={false} id={userData?.users_id} />
                                    <FeatureArtist userData={userData} />
                                </div>
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Genre" htmlFor="grid-Genre" required={true} />
                                <SelectGenre control={control} name="Genre" options={genre?.data?.data || []} errors={errors} required={true} />
                            </div>

                            <div className="w-full mb-2">
                                <Label text="Sub Genre" htmlFor="grid-SubGenre" required={false} />
                                <InputField
                                    type="text"
                                    name="SubGenre"
                                    placeholder="Enter SubGenre"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="w-full">
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

                            <div className="w-full mb-2">
                                <Label text="Release Date" htmlFor="grid-ReleaseDate" required={true} />
                                <input
                                    type="date"
                                    name="ReleaseDate"
                                    placeholder="Enter Release Date"
                                    onKeyDown={(e) => e.preventDefault()}
                                    min={maxDate || maxDate1}
                                    className={`border-2 mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${errors?.ReleaseDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    {...register("ReleaseDate", {
                                        required: "ReleaseDate is required.",
                                    })}
                                />
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

                            <div className="w-full mb-2">
                                <Label text="UPC/EAN" htmlFor="grid-UPC/EAN" required={false} />
                                <InputField
                                    type="number"
                                    name="UPCEAN"
                                    placeholder="Enter UPC/EAN"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end items-center px-8">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center"
                        disabled={isLoadingReleaseInfoPost}
                    >
                        <span className="mr-2">Save</span>
                        <AiFillSave />
                    </button>
                </div>
            </form>
        </>
    )
}