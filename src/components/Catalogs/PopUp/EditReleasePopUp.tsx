import * as React from "react";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { Controller, useForm } from "react-hook-form";
import { ReleaseInfoDto } from "../../../types/ReleaseInfo";
import { AdminEditInfoReleaseApi, GetFeaturingArtistApi, GetGenreApi, GetPrimaryArtistApi, GetReleaseInfoApi, GetReleaseInfoByIdApi, ReleaseInfoPostApi, UserDataApi } from "../../../api/releaseInfo";
import SelectGenre from "../../../ui/SelectGenre";
import SelectFeatureArtist from "../../../ui/SelectFeatureArtist";
import SelectPrimaryArtist from "../../../ui/SelectPrimaryArtist";
import { Link, useNavigate, useParams } from "react-router-dom";
import FileUpload from "../../../ui/ImageUpload";
import PrimaryArtist from "../../CreateRelease/PopUps/PrimaryArtist";
import FeatureArtist from "../../CreateRelease/PopUps/FeatureArtist";
import { BounceLoader } from "react-spinners";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';


export default function EditReleasePopUp({ id, userId }: { id: any, userId:any }) {
    const [userData, setUserData] = React.useState<any>("");
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState("");
    const items = ['EP', 'Single', 'Album', 'Compilation'];
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = React.useState(false);

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: genre } = GetGenreApi()
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userId)
    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userId)
    const { data: getReleaseInfo, isLoading, isFetching, refetch } = GetReleaseInfoByIdApi(id)
    const { mutate: ReleaseInfoEdit, isLoading: isLoadingReleaseInfoEdit } = AdminEditInfoReleaseApi(id, refetch, setIsOpen)
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


    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let formData: any = new FormData();
        formData.append("ImageDocument", file);
        formData.append("ReleaseType", selectedItems);
        formData.append("ReleaseTitle", newData.ReleaseTitle);
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
        formData.append("users_id", parseInt(userId));
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

            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full cursor-pointer transition-all duration-300 text-sm"
            >
                Edit
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Edit Release Details
                                </Dialog.Title>
                                <form >
                                    <div className="mt-2">

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
                                                <SelectPrimaryArtist control={control} name="PrimaryArtist" errors={errors} required={true} id={userId} />
                                                <PrimaryArtist userData={userData} />
                                            </div>
                                        </div>


                                        <div className="w-full mb-2">
                                            <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={false} />
                                            <div className="flex gap-2 items-center">
                                                <SelectFeatureArtist control={control} name="FeaturingArtist" errors={errors} required={false} id={userId} />
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

                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={handleSubmit(onSubmit)}
                                            className="px-4 py-2 bg-gray-700 text-white text-base rounded hover:bg-gray-600 focus:outline-none flex items-center"
                                            disabled={isLoadingReleaseInfoEdit}
                                        >
                                            <span className="mr-2">Update</span>
                                            <AiFillSave />
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}