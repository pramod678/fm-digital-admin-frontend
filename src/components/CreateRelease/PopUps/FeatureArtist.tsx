import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { useForm } from "react-hook-form";
import { FeatureArtistDto } from "../../../types/ReleaseInfo";
import { FeaturingArtisttPostApi, GetFeaturingArtistApi } from "../../../api/releaseInfo";
import { BeatLoader } from "react-spinners";

export default function FeatureArtist({ userData }: { userData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<FeatureArtistDto>()

    //featuringArtisttPost Api Call
    const { mutate: featuringArtisttPost, isLoading: isLoadingfeaturingArtisttPost } = FeaturingArtisttPostApi(setIsOpen)
    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.users_id = Number(userData?.users_id)
        featuringArtisttPost(newData)
    });

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center ml-2 py-1 px-1 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                onClick={() => setIsOpen(true)}
            >
                <AiOutlinePlus size={size} />
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
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    Create Featuring Artist
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Featuring Artist Name" htmlFor="grid-firstName" required={true} />
                                            <InputField
                                                type="text"
                                                name="FeaturingArtist"
                                                placeholder="Enter Featuring Artist Name"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Featuring Artist Name is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Featuring Artist Apple Id " htmlFor="grid-lastName" />
                                            <InputField
                                                type="url"
                                                name="AppleId"
                                                placeholder="Enter Featuring Artist Apple Id "
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Featuring Artist Spotify Id " htmlFor="grid-lastName" />
                                            <InputField
                                                type="url"
                                                name="SpotifyId"
                                                placeholder="Enter Featuring Artist Spotify Id "
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
                                            type="button"
                                            onClick={onSubmit}
                                            disabled={isLoadingfeaturingArtisttPost}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            {isLoadingfeaturingArtisttPost ? <BeatLoader color="#ffffff" /> : 'Submit'}
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