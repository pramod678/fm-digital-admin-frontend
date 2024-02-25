import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { PrimaryArtistDto, SongDetailsDto } from "../../../types/ReleaseInfo";
import { EditSongsApi, GetFeaturingArtistApi, GetGenreApi, GetLanguagesApi, GetPrimaryArtistApi, GetReleaseInfoApi, PrimaryArtisttPostApi, SongsPostApi } from "../../../api/releaseInfo";
import { BeatLoader } from "react-spinners";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import SelectPrimaryArtist from "../../../ui/SelectPrimaryArtist";
import PrimaryArtist from "./PrimaryArtist";
import FeatureArtist from "./FeatureArtist";
import SelectFeatureArtist from "../../../ui/SelectFeatureArtist";
import SelectGenre from "../../../ui/SelectGenre";
import SelectLanguage from "../../../ui/SelectLanguage";
import SelectPriceTier from "../../../ui/SelectPriceTier";
import SongsUpload from "../../../ui/SongsUpload";
import { RiEditLine } from "react-icons/ri";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import axios from "axios";
import SongPreview from "../../../ui/SongPreview";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


export default function EditSongDetails({ userData, song, getReleaseInfo, refetch }: { userData: any, song: any, getReleaseInfo?: any, refetch?: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(true)
    const size = useResponsiveIconSize();


    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<SongDetailsDto>({ defaultValues: song })

    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id)
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userData?.users_id)
    const { data: genre } = GetGenreApi()

    const Trackoptions = [
        { value: "Original", label: "Original" },
        { value: "Karaoke", label: "Karaoke" },
        { value: "Melody", label: "Melody" },
        { value: "Cover", label: "Cover" },
    ];

    const IntsrumentalOptions = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
    ];

    const PriceOptions = [
        { value: "Mini Ep ( $1.99 )", label: "Mini Ep ( $1.99 )" },
        { value: "Digital 45 ( $1.49 )", label: "Digital 45 ( $1.49 )" },
    ];

    const ExplicitVersion = [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Cleaned", label: "Cleaned" },
    ]

 

    //edit song Api Call
    const { mutate: SongsPost, isLoading: isLoadingSongsPost } = EditSongsApi({ setIsOpen, refetch, id: song?.songsInfo_id, setFile})

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let formData: any = new FormData();
        formData.append("AudioDocument", file);
        formData.append("Trackversion", newData.Trackversion);
        formData.append("Instrumental", newData.Instrumental);
        formData.append("Title", newData.Title);
        formData.append("VersionSubtitle", newData.VersionSubtitle);
        formData.append("Primaryartist", newData.Primaryartist);
        formData.append("FeaturingArtist", newData.FeaturingArtist);
        formData.append("Author", newData.Author);
        formData.append("Composer", newData.Composer);
        formData.append("Producer", newData.Producer);
        formData.append("Publisher", newData.Publisher);
        formData.append("ISRC", newData.ISRC);
        formData.append("Genre", newData.Genre);
        formData.append("PriceTier", newData.PriceTier);
        formData.append("Subgenre", newData.Subgenre);
        formData.append("ExplicitVersion", newData.ExplicitVersion);
        formData.append("TrackTitleLanguage", newData.TrackTitleLanguage);
        formData.append("LyricsLanguage", newData.LyricsLanguage);
        formData.append("Lyrics", newData.Lyrics);
        formData.append("CallerTuneTiming", newData.CallerTuneTiming);
        formData.append("DistributeMusicvideo", newData.DistributeMusicvideo);
        // @ts-ignore
        formData.append("users_id", parseInt(userData?.users_id));
        // @ts-ignore
        formData.append("releseInfo_id", parseInt(getReleaseInfo?.data?.data?.releseInfo_id));
        SongsPost(formData)

    });


    return (
        <>

            <button type="button" className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => setIsOpen(true)}>
                <RiEditLine size={size} />
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
                                    Edit songs Details
                                </Dialog.Title>
                                <form >
                                    <div className="mt-2">
                                        

                                        <SongPreview file={file} setFile={setFile} previewFile={song?.AudioDocument} preview={preview} setPreview={setPreview} />

                                        <div className="w-full mb-2">
                                            <Label text={"Track Version"} htmlFor={""} required={true} />
                                            <div className="flex space-y-2 gap-4">
                                                {Trackoptions?.map((unit: any, index: any) => (
                                                    <label key={index} className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-gray-600"
                                                            id={unit.value}
                                                            defaultChecked={unit.value == "Original"}
                                                            {...register("Trackversion", { required: `Trackversion is required ` })}
                                                            value={unit.value}
                                                        />
                                                        <span className="ml-4 text-sm">{unit.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text={"Instrumental"} htmlFor={""} required={true} />
                                            <div className="flex space-y-2 gap-4">
                                                {IntsrumentalOptions?.map((unit: any, index: any) => (
                                                    <label key={index} className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-gray-600"
                                                            id={unit.value}
                                                            defaultChecked={unit.value == "No"}
                                                            {...register("Instrumental", { required: `Instrumental is required ` })}
                                                            value={unit.value}
                                                        />
                                                        <span className="ml-4 text-sm">{unit.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Song Title" htmlFor="grid-Title" required={true} />
                                            <InputField
                                                type="text"
                                                name="Title"
                                                placeholder="Enter Title "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Title  is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Version/SubTitle" htmlFor="grid-VersionSubtitle" />
                                            <InputField
                                                type="text"
                                                name="VersionSubtitle"
                                                placeholder="Enter Version/Subtitle "
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Primary Artist" htmlFor="grid-Primaryartist" required={true} />
                                            <div className="flex gap-2 items-center">
                                                <SelectPrimaryArtist control={control} name="Primaryartist" errors={errors} required={true} id={userData?.users_id} />
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
                                            <Label text="Author" htmlFor="grid-Author" required={true} />
                                            <InputField
                                                type="text"
                                                name="Author"
                                                placeholder="Enter Author "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Author  is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Composer" htmlFor="grid-Composer" required={true} />
                                            <InputField
                                                type="text"
                                                name="Composer"
                                                placeholder="Enter Composer "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Composer  is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Producer" htmlFor="grid-Producer" required={true} />
                                            <InputField
                                                type="text"
                                                name="Producer"
                                                placeholder="Enter Producer "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Producer  is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Publisher" htmlFor="grid-Publisher" required={false} />
                                            <InputField
                                                type="text"
                                                name="Publisher"
                                                placeholder="Enter Publisher "
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="ISRC" htmlFor="grid-ISRC" required={false} />
                                            <InputField
                                                type="text"
                                                name="ISRC"
                                                placeholder="Enter ISRC "
                                                register={register}
                                                errors={errors}
                                            />
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
                                            <Label text="Price Tier" htmlFor="grid-ISRC" required={true} />
                                            <SelectPriceTier control={control} name={"PriceTier"} options={PriceOptions} errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text={"Explicit Version"} htmlFor={""} required={true} />
                                            <div className="flex space-y-2 gap-4">
                                                {ExplicitVersion?.map((unit: any, index: any) => (
                                                    <label key={index} className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-gray-600"
                                                            id={unit.value}
                                                            defaultChecked={unit.value == "No"}
                                                            {...register("ExplicitVersion", { required: `ExplicitVersion is required ` })}
                                                            value={unit.value}
                                                        />
                                                        <span className="ml-4 text-sm">{unit.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Track Title Language" htmlFor="grid-TrackTitleLanguage" required={true} />
                                            <SelectLanguage control={control} name="TrackTitleLanguage" errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Lyrics Language" htmlFor="grid-LyricsLanguage" required={true} />
                                            <SelectLanguage control={control} name="LyricsLanguage" errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Lyrics" htmlFor="grid-Lyrics" required={false} />
                                            <InputField
                                                type="text"
                                                name="Lyrics"
                                                placeholder="Enter Lyrics "
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Caller Tune Timing" htmlFor="grid-CallerTuneTiming" required={false} />
                                            {/* <TimePicker
                                                id="grid-CallerTuneTiming"
                                                onChange={onChange}
                                                value={timeValue}
                                                disableClock
                                                format="hh:mm"
                                                className="shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md transition ease-in-out duration-150"
                                            /> */}
                                            <InputField
                                                type="text"
                                                name="CallerTuneTiming"
                                                placeholder="Type like this HH:mm:ss"
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Distribute Music video" htmlFor="grid-DistributeMusicvideo" required={false} />
                                            <InputField
                                                type="text"
                                                name="DistributeMusicvideo"
                                                placeholder="Distribute Music video URL "
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
                                            disabled={isLoadingSongsPost}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            Submit
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