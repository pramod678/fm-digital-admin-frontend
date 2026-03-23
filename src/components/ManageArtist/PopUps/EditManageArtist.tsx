import * as React from "react";
import { YouTubeClaimsDto } from "../../../types/tools";
import { useForm } from "react-hook-form";
import { ManageArtistDto } from "../../../types/manageArtist";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UpdatePrimaryArtistApi, UserDataApi } from "../../../api/releaseInfo";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import { BeatLoader } from "react-spinners";


export default function Index({ data, customTrigger }: { data: any, customTrigger?: React.ReactNode }) {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<ManageArtistDto>({ defaultValues: data })
    const size = useResponsiveIconSize();

    const [userData, setUserData] = React.useState<any>("");
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { mutate: UpdatePrimaryArtist, isLoading } = UpdatePrimaryArtistApi(data?.primaryArtist_id, setIsOpen)
    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        UpdatePrimaryArtist(newData)
    });

    return (
        <>
            {customTrigger ? (
                <div onClick={() => setIsOpen(true)}>
                    {customTrigger}
                </div>
            ) : (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => setIsOpen(true)}>
                    <FaUserEdit className="cursor-pointer ml-4" size={size} />
                </td>
            )}


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
                            <div className="inline-block w-full max-w-md p-5 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="w-8"></div> {/* Spacer for centering */}
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold text-gray-800 font-['Poppins'] flex-grow text-center"
                                    >
                                        Update Artist
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <AiOutlineCloseCircle size={24} />
                                    </button>
                                </div>
                                <hr className="border-gray-100 mb-4" />
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-1">

                                        <div className="w-full mb-3">
                                            <Label text="Artist Name" htmlFor="grid-PrimaryArtist" required={false} additionalClasses="text-sm font-semibold !text-gray-700 mb-1 block" />
                                            <InputField
                                                type="text"
                                                name="PrimaryArtist"
                                                placeholder="Enter Artist Name"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Artist Name is required."
                                            />
                                        </div>

                                        <div className="w-full mb-3">
                                            <Label text="Instagram Id" htmlFor="grid-InstagramId" required={false} additionalClasses="text-sm font-semibold !text-gray-700 mb-1 block" />
                                            <InputField
                                                type="url"
                                                name="InstagramId"
                                                placeholder="Enter Instagram Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Instagram Id is required."
                                            />
                                        </div>

                                        <div className="w-full mb-3">
                                            <Label text="Facebook Id" htmlFor="grid-FacebookId" required={false} additionalClasses="text-sm font-semibold !text-gray-700 mb-1 block" />
                                            <InputField
                                                type="url"
                                                name="FacebookId"
                                                placeholder="Enter Facebook Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Facebook Id is required."
                                            />
                                        </div>
                                        <div className="w-full mb-3">
                                            <Label text="Spotify Id" htmlFor="grid-SpotifyId" required={false} additionalClasses="text-sm font-semibold !text-gray-700 mb-1 block" />
                                            <InputField
                                                type="url"
                                                name="SpotifyId"
                                                placeholder="Enter Spotify Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Spotify Id is required."
                                            />
                                        </div>
                                        <div className="w-full mb-3">
                                            <Label text="Apple Id" htmlFor="grid-AppleId" required={false} additionalClasses="text-sm font-semibold !text-gray-700 mb-1 block" />
                                            <InputField
                                                type="url"
                                                name="AppleId"
                                                placeholder="Apple Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Apple Id is required."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-between space-x-4">
                                        <button
                                            type="button"
                                            className="flex-1 px-4 py-3 text-lg font-bold text-gray-700 bg-white border border-red-200 rounded-xl hover:bg-red-50 focus:outline-none transition-colors typo-btn-main"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 px-4 py-3 text-lg font-bold text-white bg-[#00c26d] border border-transparent rounded-xl hover:bg-[#00a65d] focus:outline-none transition-colors typo-btn-main"
                                        >
                                            {isLoading ? <BeatLoader color="#ffffff" size={10} /> : 'Update'}
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

