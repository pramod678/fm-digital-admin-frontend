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


export default function Index({ data }: { data: any }) {

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
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" onClick={() => setIsOpen(true)}>
                <FaUserEdit className="cursor-pointer ml-4" size={size} />
            </td>


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
                                    Edit Title
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Artist Name" htmlFor="grid-PrimaryArtist" required={true} />
                                            <InputField
                                                type="text"
                                                name="PrimaryArtist"
                                                placeholder="Enter Artist Name"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Artist Name is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Instagram Id" htmlFor="grid-InstagramId" required={true} />
                                            <InputField
                                                type="url"
                                                name="InstagramId"
                                                placeholder="Enter Instagram Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Instagram Id is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Facebook Id" htmlFor="grid-FacebookId" required={true} />
                                            <InputField
                                                type="url"
                                                name="FacebookId"
                                                placeholder="Enter Facebook Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Facebook Id is required."
                                            />
                                        </div>
                                        <div className="w-full mb-2">
                                            <Label text="Spotify Id" htmlFor="grid-SpotifyId" required={true} />
                                            <InputField
                                                type="url"
                                                name="SpotifyId"
                                                placeholder="Enter Spotify Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Spotify Id is required."
                                            />
                                        </div>
                                        <div className="w-full mb-2">
                                            <Label text="Apple Id" htmlFor="grid-AppleId" required={true} />
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
                                            disabled={isLoading}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            {isLoading ? <BeatLoader color="#ffffff" /> : 'Update'}
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

