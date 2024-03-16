import * as React from "react";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { ReleaseInfoDto } from "../../types/ReleaseInfo";
import { EditInfoReleaseApi, GetFeaturingArtistApi, GetGenreApi, GetPrimaryArtistApi, GetReleaseInfoApi, GetReleaseInfoByIdApi, ReleaseInfoPostApi, UserDataApi } from "../../api/releaseInfo";
import SelectGenre from "../../ui/SelectGenre";
import SelectFeatureArtist from "../../ui/SelectFeatureArtist";
import SelectPrimaryArtist from "../../ui/SelectPrimaryArtist";
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../ui/ImageUpload";
import PrimaryArtist from "../CreateRelease/PopUps/PrimaryArtist";
import FeatureArtist from "../CreateRelease/PopUps/FeatureArtist";
import { BounceLoader } from "react-spinners";


export default function EditReleaseInfo() {

    const { id } = useParams();
    const [userData, setUserData] = React.useState<any>("");
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState("");
    const items = ['EP', 'Single', 'Album', 'Compilation'];
    const navigate = useNavigate()

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: genre } = GetGenreApi()
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userData?.users_id)
    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id)
    const { data: getReleaseInfo, isLoading, isFetching, refetch } = GetReleaseInfoByIdApi(id)
    const { mutate: ReleaseInfoEdit, isLoading: isLoadingReleaseInfoEdit } = EditInfoReleaseApi(navigate, id, refetch)
    const [preview, setPreview] = React.useState(true)


    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors }
    } = useForm<ReleaseInfoDto>({ defaultValues: getReleaseInfo?.data?.data })


    React.useEffect(() => {
        if (!isLoading) {
            // @ts-ignore
            setValue("ReleaseType", setSelectedItems(getReleaseInfo?.data?.data?.ReleaseType))
            setValue("ReleaseTitle", getReleaseInfo?.data?.data?.ReleaseTitle)
            setValue("PrimaryArtist", getReleaseInfo?.data?.data?.PrimaryArtist)
            setValue("FeaturingArtist", getReleaseInfo?.data?.data?.FeaturingArtist)
            setValue("Genre", getReleaseInfo?.data?.data?.Genre)
            setValue("SubGenre", getReleaseInfo?.data?.data?.SubGenre)
            setValue("LabelName", getReleaseInfo?.data?.data?.LabelName)
            setValue("ReleaseDate", getReleaseInfo?.data?.data?.ReleaseDate)
            setValue("PLine", getReleaseInfo?.data?.data?.PLine)
            setValue("CLine", getReleaseInfo?.data?.data?.CLine)
            setValue("UPCEAN", getReleaseInfo?.data?.data?.UPCEAN)
        }
    }, [isLoading])


    const [file, setFile] = React.useState(null);
    const token = localStorage.getItem("token")

    const tabs = [
        { name: 'Release Info', route: `/ReleseInfoUpdate/${id}` },
        { name: 'Song Info', route: `/Songsinfo/${id}` },
        { name: 'Platform', route: `/Platform/${id}` },
        { name: 'Submission', route: `/Submission/${id}` },
    ]

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const handleClick = (item: any) => {
        setSelectedItems(item);
    };

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
        formData.append("SubGenre", newData.SubGenre);
        formData.append("LabelName", newData.LabelName);
        formData.append("ReleaseDate", newData.ReleaseDate);
        formData.append("PLine", newData.PLine);
        formData.append("CLine", newData.CLine);
        formData.append("UPCEAN", newData.UPCEAN);
        // @ts-ignore
        formData.append("users_id", parseInt(userData.users_id));
        // @ts-ignore
        formData.append("Status", parseInt(0));
        ReleaseInfoEdit(formData)
    }
    )


    var today = new Date();
    var targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 6); // Adding 5 days

    // @ts-ignore
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


    return (
        <>
            {(isLoading || isFetching) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
                    <BounceLoader size={150} color={"#000000"} />
                </div>
            )}
            <div className="flex items-center justify-center pt-3 px-2 border-t-2 border-b-1 border-gray-600 w-full mt-6">
                <div className="flex items-center">
                    {tabs?.map((r, index) => (
                        // <Link to={`${r?.route}`}>
                        <button
                            key={index}
                            type="button"
                            onClick={() => navigate(`${r.route}`)}
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
                <div className="flex flex-col md:flex-row gap-4 p-8">
                    {/* Image */}
                    <div className="flex flex-col items-center mt-4 space-y-4">
                        <FileUpload file={file} setFile={setFile} previewFile={getReleaseInfo?.data?.data?.ImageDocument} preview={preview} setPreview={setPreview} />
                        <div className="text-left">
                            <h6 className="font-bold text-center text-teal-500">Artwork Guidelines</h6>
                            <ul className="list-disc list-inside text-xs">
                                <li>Files accepeted are .png, JPEG files</li>
                                <li>File size should be up to 2MB.</li>
                                <li>For optimal results, ensure the image dimensions are N x N pixels.(eg :1000 x 1000 , 2000 x 2000)</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row items-center sm:sm:gap-8 mt-1">
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
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
                            <div className="w-full mb-2">
                                <Label text="Primary Artist" htmlFor="grid-PrimaryArtist" required={true} />
                                <div className="flex gap-2 items-center">
                                    <SelectPrimaryArtist control={control} name="PrimaryArtist" errors={errors} required={true} id={userData?.users_id} />
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
                                <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={false} />
                                <div className="flex gap-2 items-center">
                                    <SelectFeatureArtist control={control} name="FeaturingArtist" errors={errors} required={false} id={userData?.users_id} />
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
                        <div className="flex flex-col sm:flex-row items-center sm:gap-8 mt-1">
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

                            <div className="mt-4 w-full flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center"
                                    disabled={isLoadingReleaseInfoEdit}
                                >
                                    <span className="mr-2">Update</span>
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