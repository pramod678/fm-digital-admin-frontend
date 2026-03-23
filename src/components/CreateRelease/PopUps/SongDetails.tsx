import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from "react-hook-form";
import { PrimaryArtistDto, SongDetailsDto } from "../../../types/ReleaseInfo";
import { GetFeaturingArtistApi, GetGenreApi, GetLanguagesApi, GetPrimaryArtistApi, GetReleaseInfoApi, PrimaryArtisttPostApi, SongsPostApi } from "../../../api/releaseInfo";
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
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import { capitalizeString } from "../../../utility/Capitilize";
import { AiFillSave } from "react-icons/ai";


export default function SongDetails({ userData, getReleaseInfo, GetSongs, refetch }: { userData: any, getReleaseInfo: any, GetSongs: any, refetch: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [primaryArtistGet, setprimaryArtistGet] = React.useState([]);
    const [featuringArtistGet, setfeaturingArtistGet] = React.useState([]);
    const [file, setFile] = useState(null);

    // Multi-select state for Authors and Composers
    const [authors, setAuthors] = React.useState<string[]>([]);
    const [composers, setComposers] = React.useState<string[]>([]);

    const [authorFirstName, setAuthorFirstName] = React.useState("");
    const [authorLastName, setAuthorLastName] = React.useState("");
    
    const [composerFirstName, setComposerFirstName] = React.useState("");
    const [composerLastName, setComposerLastName] = React.useState("");
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<SongDetailsDto>()


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


    //featuringArtisttPost Api Call
    const { mutate: SongsPost, isLoading: isLoadingSongsPost } = SongsPostApi({ setIsOpen, refetch, reset, setFile })

    // --- Multi-select Handlers ---
    const handleAddAuthor = () => {
        if (!authorFirstName.trim() || !authorLastName.trim()) return;
        const fullName = toTitleCase(`${authorFirstName.trim()} ${authorLastName.trim()}`);
        if (authors.length >= 3) return; // Max 3 check
        if (!authors.includes(fullName)) {
            setAuthors((prev) => [...prev, fullName]);
        }
        setAuthorFirstName("");
        setAuthorLastName("");
    };

    const handleRemoveAuthor = (nameToRemove: string) => {
        setAuthors((prev) => prev.filter(name => name !== nameToRemove));
    };

    const handleAddComposer = () => {
        if (!composerFirstName.trim() || !composerLastName.trim()) return;
        const fullName = toTitleCase(`${composerFirstName.trim()} ${composerLastName.trim()}`);
        if (composers.length >= 3) return; // Max 3 check
        if (!composers.includes(fullName)) {
            setComposers((prev) => [...prev, fullName]);
        }
        setComposerFirstName("");
        setComposerLastName("");
    };

    const handleRemoveComposer = (nameToRemove: string) => {
        setComposers((prev) => prev.filter(name => name !== nameToRemove));
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
        formData.append("AudioDocument", file);
        formData.append("Trackversion", newData.Trackversion);
        formData.append("Instrumental", newData.Instrumental);
        formData.append("Title", toTitleCase(newData.Title));
        formData.append("VersionSubtitle", newData.VersionSubtitle);
        formData.append("Primaryartist", newData.Primaryartist);
        formData.append("FeaturingArtist", newData.FeaturingArtist);
        
        // Use local multi-select state
        formData.append("Author", authors.join(", "));
        formData.append("Composer", composers.join(", "));
        
        formData.append("Producer", toTitleCase(newData.Producer));
        formData.append("Publisher", newData.Publisher);
        formData.append("ISRC", newData.ISRC);
        formData.append("Genre", newData.Genre);
        formData.append("PriceTier", newData.PriceTier);
        formData.append("Subgenre", toTitleCase(newData.Subgenre));
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
            {
                !isOpen && (getReleaseInfo?.data?.data?.ReleaseType !== 'Single' || GetSongs?.data?.data?.length !== 1) &&
                <div className="flex justify-center items-center">
                    <button type="button" className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition shadow-sm" onClick={() => setIsOpen(true)}>Add Song Details</button>
                </div>
            }


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
                            <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add songs Details
                                </Dialog.Title>
                                <form onSubmit={onSubmit}>
                                    <div className="mt-2">

                                        <SongsUpload file={file} setFile={setFile} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                                            <div className="w-full">
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

                                            <div className="w-full">
                                                <Label text="Version/SubTitle" htmlFor="grid-VersionSubtitle" />
                                                <InputField
                                                    type="text"
                                                    name="VersionSubtitle"
                                                    placeholder="Enter Version/Subtitle "
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Primary Artist" htmlFor="grid-Primaryartist" required={true} />
                                                <div className="flex gap-2 items-center">
                                                    <SelectPrimaryArtist control={control} name="Primaryartist" errors={errors} required={true} id={userData?.users_id} />
                                                    <PrimaryArtist userData={userData} />
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <Label text="Featuring Artist" htmlFor="grid-FeaturingArtist" required={false} />
                                                <div className="flex gap-2 items-center">
                                                    <SelectFeatureArtist control={control} name="FeaturingArtist" errors={errors} required={false} id={userData?.users_id} />
                                                    <FeatureArtist userData={userData} />
                                                </div>
                                            </div>

                                            {/* AUTHOR MULTI-SELECT UI */}
                                            <div className="w-full">
                                                <Label text="Author" htmlFor="grid-Author" required={false} />
                                                <div className="flex items-center gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={authorFirstName}
                                                        onChange={(e) => setAuthorFirstName(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAuthor())}
                                                        className="flex-1 w-full bg-slate-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={authorLastName}
                                                        onChange={(e) => setAuthorLastName(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAuthor())}
                                                        className="flex-1 w-full bg-slate-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddAuthor}
                                                        disabled={authors.length >= 3 || !authorFirstName.trim() || !authorLastName.trim()}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm font-medium transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                {authors.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {authors.map((author, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                                                                <span>{author}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveAuthor(author)}
                                                                    className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center transition-colors"
                                                                    title="Remove"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">Maximum 3 authors allowed. Example: John Doe</p>
                                            </div>

                                            {/* COMPOSER MULTI-SELECT UI */}
                                            <div className="w-full">
                                                <Label text="Composer" htmlFor="grid-Composer" required={false} />
                                                <div className="flex items-center gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={composerFirstName}
                                                        onChange={(e) => setComposerFirstName(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddComposer())}
                                                        className="flex-1 w-full bg-slate-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={composerLastName}
                                                        onChange={(e) => setComposerLastName(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddComposer())}
                                                        className="flex-1 w-full bg-slate-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:ring-0 sm:text-sm sm:leading-6 transition-colors duration-200 ease-in-out"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddComposer}
                                                        disabled={composers.length >= 3 || !composerFirstName.trim() || !composerLastName.trim()}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm font-medium transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                {composers.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {composers.map((composer, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                                                                <span>{composer}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveComposer(composer)}
                                                                    className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center transition-colors"
                                                                    title="Remove"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">Maximum 3 composers allowed. Example: Jane Doe</p>
                                            </div>

                                            <div className="w-full">
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

                                            <div className="w-full">
                                                <Label text="Publisher" htmlFor="grid-Publisher" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="Publisher"
                                                    placeholder="Enter Publisher "
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label text="ISRC" htmlFor="grid-ISRC" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="ISRC"
                                                    placeholder="Enter ISRC "
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>


                                            <div className="w-full">
                                                <Label text="Genre" htmlFor="grid-Genre" required={true} />
                                                <SelectGenre control={control} name="Genre" options={genre?.data?.data || []} errors={errors} required={true} />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Sub Genre" htmlFor="grid-SubGenre" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="Subgenre"
                                                    placeholder="Enter SubGenre"
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Price Tier" htmlFor="grid-ISRC" required={true} />
                                                <SelectPriceTier control={control} name={"PriceTier"} options={PriceOptions} errors={errors} required={true} />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Track Title Language" htmlFor="grid-TrackTitleLanguage" required={true} />
                                                <SelectLanguage control={control} name="TrackTitleLanguage" errors={errors} required={true} />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Lyrics Language" htmlFor="grid-LyricsLanguage" required={true} />
                                                <SelectLanguage control={control} name="LyricsLanguage" errors={errors} required={true} />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Lyrics" htmlFor="grid-Lyrics" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="Lyrics"
                                                    placeholder="Enter Lyrics "
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

                                            <div className="w-full flex flex-col">
                                                <Label text="Caller Tune Timing" htmlFor="grid-CallerTuneTiming" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="CallerTuneTiming"
                                                    placeholder="Type like this HH:mm:ss"
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>

                                            <div className="w-full">
                                                <Label text="Released Video URL" htmlFor="grid-DistributeMusicvideo" required={false} />
                                                <InputField
                                                    type="text"
                                                    name="DistributeMusicvideo"
                                                    placeholder="Released Video URL"
                                                    register={register}
                                                    errors={errors}
                                                />
                                            </div>
                                            
                                            <div className="w-full">
                                                <Label text={"Instrumental"} htmlFor={""} required={true} />
                                                <div className="flex space-y-2 gap-4 mt-1">
                                                    {IntsrumentalOptions?.map((unit: any, index: any) => (
                                                        <label key={index} className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="h-4 w-4 text-gray-600"
                                                                id={unit.value}
                                                                defaultChecked={unit.value == "No"}
                                                                {...register("Instrumental", { required: `Instrumental is required ` })}
                                                                value={unit.value}
                                                            />
                                                            <span className="ml-2 text-sm text-gray-700">{unit.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full">
                                                <Label text={"Explicit Version"} htmlFor={""} required={true} />
                                                <div className="flex space-y-2 gap-4 mt-1">
                                                    {ExplicitVersion?.map((unit: any, index: any) => (
                                                        <label key={index} className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="h-4 w-4 text-gray-600"
                                                                id={unit.value}
                                                                defaultChecked={unit.value == "No"}
                                                                {...register("ExplicitVersion", { required: `ExplicitVersion is required ` })}
                                                                value={unit.value}
                                                            />
                                                            <span className="ml-2 text-sm text-gray-700">{unit.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full col-span-1 md:col-span-2">
                                                <Label text={"Track Version"} htmlFor={""} required={true} />
                                                <div className="flex flex-wrap gap-4 mt-1">
                                                    {Trackoptions?.map((unit: any, index: any) => (
                                                        <label key={index} className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="h-4 w-4 text-gray-600"
                                                                id={unit.value}
                                                                defaultChecked={unit.value == "Original"}
                                                                {...register("Trackversion", { required: `Trackversion is required ` })}
                                                                value={unit.value}
                                                            />
                                                            <span className="ml-2 text-sm">{unit.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3 border-t border-gray-100 pt-6">
                                        <button
                                            type="button"
                                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition shadow-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoadingSongsPost}
                                            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition shadow-sm text-sm font-medium"
                                        >
                                            {isLoadingSongsPost ? <BeatLoader color="white" size={8} /> : "Save Changes"} <AiFillSave size={18} />
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