import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { useForm } from "react-hook-form";
import { PrimaryArtistDto } from "../../../types/ReleaseInfo";
import { PrimaryArtisttPostApi, UserDataApi } from "../../../api/releaseInfo";
import { BeatLoader } from "react-spinners";
import { ProfileLinkingDto, YouTubeClaimsDto, policyOptions } from "../../../types/tools";
import { useNavigate } from "react-router-dom";
import SelectRelease from "../../../ui/SelectRelease";
import SelectAudio from "../../../ui/SelectAudio";
import { GetAllReleseInfoApi, ProfileLinkinAdudiogGetApi, ReleseInfoGetOneApi } from "../../../api/youtubeClaims";
import { FaEdit } from "react-icons/fa";
import { ProfileLinkingPostApi } from "../../../api/profileLinking";


export default function CreateProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();
    const [userData, setUserData] = React.useState<any>("")
    const [selectRelease, setSelectRelease] = React.useState<any>([]);
    const [selectedId, setSelectedId] = React.useState<any>();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors }
    } = useForm<ProfileLinkingDto>({})

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [releseInfoGetOne, setReleseInfoGetOne] = React.useState<any>([]);
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)
    const { data: releseInfoGet, isLoading: isLoadingreleseInfoGetOne } = GetAllReleseInfoApi(userData.users_id, setReleseInfoGetOne)
    const { mutate: ProfileLinkingPost, isLoading: isLoadingProfileLinkingPost } = ProfileLinkingPostApi(reset, setIsOpen)
    //Api calls
    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    const { data: ProfileLinkinAdudiogGet, isLoading: isLoadingProfileLinkinAdudiogGet } = ProfileLinkinAdudiogGetApi(releseInfoGetOne[0]?.users_id, selectedId)
    //featuringArtisttPost Api Call
    const { mutate: PrimaryArtisttPost, isLoading: isLoadingPrimaryArtisttPost } = PrimaryArtisttPostApi(setIsOpen)

    React.useEffect(() => {
        const selectedObj = releseInfoGetOne?.filter((r: any) => r?.ReleaseTitle === selectRelease)
        setSelectedId(selectedObj[0]?.releseInfo_id)
    }, [selectRelease]);

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.users_id = parseInt(userData.users_id);
        ProfileLinkingPost(newData)
    })

    return (
        <>

            <div className="flex justify-end w-full">
                <button
                    className="flex items-center text-sm justify-center ml-2 py-2 px-2 bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 mb-4 rounded-md mt-2"
                    onClick={() => setIsOpen(true)}
                >
                    <AiOutlinePlus size={size} />
                    Add Profile Linking
                </button>
            </div>

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
                                    Add Profile Linking
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Select Release" htmlFor="grid-Selectrelease" required={true} />
                                            <SelectRelease control={control} name="Selectrelease" options={releseInfoGetOne} errors={errors} required={true} setSelectRelease={setSelectRelease} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Select Audio" htmlFor="grid-SelectAudio" required={true} />
                                            <SelectAudio control={control} name="SelectAudio" options={ProfileLinkinAdudiogGet?.data?.data} errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Artist Name" htmlFor="grid-Artist" required={true} />
                                            <InputField
                                                type="text"
                                                name="ArtistName"
                                                placeholder="Make sure to enter the exact name of artist"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="ArtistName is required."
                                            />
                                        </div>
                                        <div className="w-full mb-2">
                                            <Label text="Facebook Link" htmlFor="grid-FecebookLink" required={true} />
                                            <InputField
                                                type="url"
                                                name="FecebookLink"
                                                placeholder="Enter Facebook Link"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Facebook Link is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Instagram Link" htmlFor="grid-InstagramLink" required={true} />
                                            <InputField
                                                type="url"
                                                name="InstagramLink"
                                                placeholder="Enter Instagram Link"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Instagram Link is required."
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