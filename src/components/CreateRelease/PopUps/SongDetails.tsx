import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { PrimaryArtistDto, SongDetailsDto } from "../../../types/ReleaseInfo";
import { GetFeaturingArtistApi, GetGenreApi, GetLanguagesApi, GetPrimaryArtistApi, PrimaryArtisttPostApi } from "../../../api/releaseInfo";
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


export default function SongDetails({ userData }: { userData :any}) {
    const [isOpen, setIsOpen] = useState(false);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<SongDetailsDto>()


    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(userData?.users_id, setprimaryArtistGet)
    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(userData?.users_id, setfeaturingArtistGet)
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

    const ExplicitVersion= [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "Cleaned", label: "Cleaned" },
    ]


    //featuringArtisttPost Api Call
    const { mutate: PrimaryArtisttPost, isLoading: isLoadingPrimaryArtisttPost } = PrimaryArtisttPostApi(setIsOpen)
    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        // newData.users_id = Number(userData?.users_id)
        PrimaryArtisttPost(newData)
    });


    return (
        <>
            <button type="button" className="bg-black text-white px-2 py-2 " onClick={() => setIsOpen(true)}>Add Song Details</button>

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
                                    Add songs Details
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">
                                        <div className="w-full mb-2">
                                            <Label text={"Track Version"} htmlFor={""} required={true} />
                                            <div className="flex space-y-2 gap-4">
                                                {Trackoptions?.map((unit: any, index: any) => (
                                                    <label key={index} className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-gray-600"
                                                            id={unit.value}
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
                                                            {...register("Instrumental", { required: `Instrumental is required ` })}
                                                            value={unit.value}
                                                        />
                                                        <span className="ml-4 text-sm">{unit.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Title" htmlFor="grid-Title" />
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
                                                requiredMessage="VersionSubtitle  is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Primary Artist" htmlFor="grid-Primaryartist" required={true} />
                                            <div className="flex gap-2 items-center">
                                                <SelectPrimaryArtist control={control} name="Primaryartist" options={primaryArtistGet} errors={errors} required={true} />
                                                <PrimaryArtist userData={userData} />
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={true} />
                                            <div className="flex gap-2 items-center">
                                                <SelectFeatureArtist control={control} name="FeaturingArtist" options={featuringArtistGet} errors={errors} required={true} />
                                                <FeatureArtist userData={userData} />
                                            </div>
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Author" htmlFor="grid-Author" />
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
                                            <Label text="Composer" htmlFor="grid-Composer" />
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
                                            <Label text="Producer" htmlFor="grid-Producer" />
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
                                            <Label text="Publisher" htmlFor="grid-Publisher" />
                                            <InputField
                                                type="text"
                                                name="Publisher"
                                                placeholder="Enter Publisher "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Publisher  is required."
                                            />
                                        </div>  

                                        <div className="w-full mb-2">
                                            <Label text="ISRC" htmlFor="grid-ISRC" />
                                            <InputField
                                                type="text"
                                                name="ISRC"
                                                placeholder="Enter ISRC "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="ISRC  is required."
                                            />
                                        </div>  
 

                                        <div className="w-full mb-2">
                                            <Label text="Genre" htmlFor="grid-Genre" required={true} />
                                            <SelectGenre control={control} name="Genre" options={genre?.data?.data || []} errors={errors} required={true} />
                                        </div>

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

                                        <div className="w-full mb-2">
                                            <Label text="Price Tier" htmlFor="grid-ISRC" />
                                            <SelectPriceTier control={control} name={""} options={PriceOptions} errors={errors} required={false} />
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
                                            <Label text="Lyrics" htmlFor="grid-Lyrics" />
                                            <InputField
                                                type="text"
                                                name="Lyrics"
                                                placeholder="Enter Lyrics "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Lyrics  is required."
                                            />
                                        </div>  

                                        <div className="w-full mb-2">
                                            <Label text="Caller Tune Timing" htmlFor="grid-CallerTuneTiming" />
                                            <InputField
                                                type="time"
                                                name="CallerTuneTiming"
                                                placeholder="Enter hh:mm:ss "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="CallerTuneTiming  is required."
                                            />
                                        </div>  

                                        <div className="w-full mb-2">
                                            <Label text="Distribute Music video" htmlFor="grid-DistributeMusicvideo" />
                                            <InputField
                                                type="text"
                                                name="DistributeMusicvideo"
                                                placeholder="Distribute Music video URL "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="DistributeMusicvideo  is required."
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
                                            disabled={isLoadingPrimaryArtisttPost}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            {isLoadingPrimaryArtisttPost ? <BeatLoader color="#ffffff" /> : 'Submit'}
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