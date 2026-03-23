import * as React from "react";
import { YouTubeClaimsDto } from "../../../../types/tools";
import { useForm } from "react-hook-form";
import { ManageArtistDto } from "../../../../types/manageArtist";
import Label from "../../../../ui/Label";
import InputField from "../../../../ui/InputField";
import { AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UpdateAdminFeaturingArtistApi, UpdateAdminPrimaryArtistApi, UpdatePrimaryArtistApi, UserDataApi } from "../../../../api/releaseInfo";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiEdit2 } from "react-icons/fi";
import { BeatLoader } from "react-spinners";
import useResponsiveIconSize from "../../../../hooks/useResponsiveIconSize";
import { FeatureArtistDto } from "../../../../types/ReleaseInfo";

export default function EditAdminManageArtist({ Initialdata }: { Initialdata: any }) {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<FeatureArtistDto>({ defaultValues: Initialdata })
    const size = useResponsiveIconSize();

    const [isOpen, setIsOpen] = useState(false);

    const { mutate: UpdateAdminFeaturingArtist, isLoading } = UpdateAdminFeaturingArtistApi(Initialdata?.featuringArtist_id, setIsOpen)


    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        UpdateAdminFeaturingArtist(newData)
    });

    return (
        <>
            <button 
                className="p-1 rounded bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all shadow-sm group"
                onClick={() => setIsOpen(true)}
            >
                <FiEdit2 size={16} className="group-hover:scale-110 transition-transform" />
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
                            <div className="inline-block w-full max-w-md p-5 my-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <div className="flex justify-between items-center mb-3">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold text-gray-800 typo-section-title"
                                    >
                                        Update Artist
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <AiOutlineCloseCircle size={20} />
                                    </button>
                                </div>
                                <hr className="border-gray-100 mb-4" />
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }} className="max-h-[70vh] overflow-y-auto pr-1 custom-scrollbar">
                                    <div className="space-y-3">

                                        <div>
                                            <div className="mb-1">
                                                <Label text="Artist Name" htmlFor="grid-FeaturingArtist" />
                                            </div>
                                            <InputField
                                                type="text"
                                                name="FeaturingArtist"
                                                placeholder="Enter Artist Name"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Artist Name is required."
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-1">
                                                <Label text="Spotify Id" htmlFor="grid-SpotifyId" />
                                            </div>
                                            <InputField
                                                type="url"
                                                name="SpotifyId"
                                                placeholder="Enter Spotify Id"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Spotify Id is required."
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-1">
                                                <Label text="Apple Id" htmlFor="grid-AppleId" />
                                            </div>
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

                                    <div className="mt-6 flex justify-between space-x-3">
                                        <button
                                            type="button"
                                            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none transition-all typo-btn-main shadow-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#00c26d] border border-transparent rounded-xl hover:bg-[#00a65d] focus:outline-none transition-all typo-btn-main shadow-md"
                                        >
                                            {isLoading ? <BeatLoader color="#ffffff" size={8} /> : 'Update'}
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

