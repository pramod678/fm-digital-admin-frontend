import * as React from "react";
import { useForm } from "react-hook-form";
import { EditSongsApi, GetFeaturingArtistApi, GetGenreApi, GetPrimaryArtistApi } from "../../api/releaseInfo";
import { BeatLoader } from "react-spinners";
import Label from "../../ui/Label";
import InputField from "../../ui/InputField";
import SelectPrimaryArtist from "../../ui/SelectPrimaryArtist";
import PrimaryArtist from "./PopUps/PrimaryArtist";
import SelectFeatureArtist from "../../ui/SelectFeatureArtist";
import FeatureArtist from "./PopUps/FeatureArtist";
import SelectGenre from "../../ui/SelectGenre";
import SelectLanguage from "../../ui/SelectLanguage";
import SelectPriceTier from "../../ui/SelectPriceTier";
import SongsUpload from "../../ui/SongsUpload";
import SongPreview from "../../ui/SongPreview";
import { MdDelete } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";

// Note: Reusing the same UI styles as the ReleaseInfo multi-selects.
const MultiSelectPill = ({ label, onRemove }: { label: string, onRemove: () => void }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-sm animate-fade-in-up">
        <span>{label}</span>
        <button
            type="button"
            onClick={onRemove}
            className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center transition-colors"
            title="Remove"
        >
            ×
        </button>
    </div>
);

export default function InlineSongForm({ userData, song, getReleaseInfo, refetch }: any) {
    const [file, setFile] = React.useState(null);
    const [preview, setPreview] = React.useState(true);

    // Multi-select state for Authors and Composers
    const [authors, setAuthors] = React.useState<string[]>(song?.Author ? song.Author.split(",").map((s: string) => s.trim()).filter(Boolean) : []);
    const [composers, setComposers] = React.useState<string[]>(song?.Composer ? song.Composer.split(",").map((s: string) => s.trim()).filter(Boolean) : []);

    // Local input states for the complex First/Last name fields
    const [authorFirstName, setAuthorFirstName] = React.useState("");
    const [authorLastName, setAuthorLastName] = React.useState("");
    
    const [composerFirstName, setComposerFirstName] = React.useState("");
    const [composerLastName, setComposerLastName] = React.useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({ defaultValues: song });

    const { data: genre } = GetGenreApi();

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
    ];

    // Dummy setter to match EditSongsApi hook expectations (since we removed the modal logic)
    const setIsOpen = () => {};
    const { mutate: SongsPost, isLoading: isLoadingSongsPost } = EditSongsApi({ setIsOpen, refetch, id: song?.songsInfo_id, setFile });

    function toTitleCase(str: string) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

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


    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let formData: any = new FormData();
        
        // Merge the pill arrays back to comma-separated strings for the backend
        const mergedAuthors = authors.join(", ");
        const mergedComposers = composers.join(", ");

        formData.append("AudioDocument", file);
        formData.append("Trackversion", newData.Trackversion);
        formData.append("Instrumental", newData.Instrumental);
        formData.append("Title", newData.Title);
        formData.append("VersionSubtitle", newData.VersionSubtitle);
        formData.append("Primaryartist", newData.Primaryartist);
        formData.append("FeaturingArtist", newData.FeaturingArtist);
        
        formData.append("Author", mergedAuthors);
        formData.append("Composer", mergedComposers);
        
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
        
        formData.append("users_id", parseInt(userData?.users_id));
        formData.append("releseInfo_id", parseInt(getReleaseInfo?.data?.data?.releseInfo_id));
        
        SongsPost(formData);
    });

    return (
        <form onSubmit={onSubmit} className="max-w-7xl mx-auto border border-gray-200 rounded-xl p-6 shadow-sm mb-8 bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Song: {song?.Title || "Untitled"}
            </h3>

            <div className="mb-6">
                <SongPreview file={file} setFile={setFile} previewFile={song?.AudioDocument} preview={preview} setPreview={setPreview} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="w-full">
                    <Label text="Song Title" htmlFor="grid-Title" required={true} />
                    <InputField
                        type="text"
                        name="Title"
                        placeholder="Enter Title "
                        register={register}
                        errors={errors}
                        requiredMessage="Title is required."
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
                                <MultiSelectPill key={idx} label={author} onRemove={() => handleRemoveAuthor(author)} />
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
                                <MultiSelectPill key={idx} label={composer} onRemove={() => handleRemoveComposer(composer)} />
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
                                <span className="ml-2 text-sm text-gray-700">{unit.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4 border-t border-gray-100 pt-6">
                <button
                    type="submit"
                    disabled={isLoadingSongsPost}
                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-200 border border-gray-300 transition shadow-sm text-sm font-medium"
                >
                    {isLoadingSongsPost ? <BeatLoader color="gray" size={8} /> : "Update Song"} <AiFillSave size={16} className="text-gray-500" />
                </button>
            </div>
        </form>
    );
}
