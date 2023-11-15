import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import Label from "../../../ui/Label";
import InputField from "../../../ui/InputField";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { LabelDto } from "../../../types/label";
import { LabelPostApi } from "../../../api/label";
import { TicketDto } from "../../../types/ticket";
import SelectReason from "../../../ui/SelectReason";
import CustomTextArea from "../../../ui/CustomTextArea";

export default function AddTicket({ userData }: { userData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();
    const [ImageDocument, setImageDocument] = useState({ preview: "", data: "" });
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<TicketDto>()

    const handleFileChange = (e: any) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = {
                    preview: reader.result as string,
                    data: e.target.files[0],
                };
                setImageDocument(img);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const clearImage = (e: any) => {
        e.stopPropagation();
        setImageDocument({ preview: "", data: "" });
    };

    const options = [
        { value: "Artist Digital Presence", label: "Artist Digital Presence" },
        { value: "Change in Release", label: "Change in Release" },
        { value: "Callertune Codes", label: "Callertune Codes" },
        { value: "Delivery Status", label: "Delivery Status" },
        { value: "Takedown Request", label: "Takedown Request" },
        { value: "Others", label: "Others" },
    ];


    //featuringArtisttPost Api Call
    const { mutate: LabelPost, isLoading: isLoadingLabelPost } = LabelPostApi(setIsOpen)
    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        console.log(ImageDocument.data, "ImageDocument")
        newData.labelDocument = ImageDocument.data
        console.log(newData, "newData")
        // LabelPost(newData)
    });

    return (
        <>
            <button
                className="flex items-center justify-center ml-2 py-2 px-4 bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50"
                onClick={() => setIsOpen(true)}
            >
                <AiOutlinePlus size={size} />
                Add Ticket
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
                                    Add Ticket
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Reason" htmlFor="grid-reason" />
                                            <SelectReason control={control} name="reason" options={options} errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Tell us more about it" htmlFor="grid-description" />
                                            <CustomTextArea
                                                name="description"
                                                placeholder="Enter description"
                                                register={register}
                                                error={errors.description}
                                                validationRules={{
                                                    required: "description is required.",
                                                }}
                                                rows={3}
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="File" htmlFor="grid-File" />
                                            <div className="relative w-32 h-32">
                                                <label className="border-2 border-gray-400 flex items-center justify-center text-gray-500 cursor-pointer w-full h-full">
                                                    {ImageDocument.preview ? (
                                                        <img src={ImageDocument.preview} alt="Selected" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <span className="text-center">Upload</span>
                                                        </div>
                                                    )}
                                                    <input
                                                        id="fileInput"
                                                        accept="image/*"
                                                        type="file"
                                                        name="ImageDocument"
                                                        onChange={handleFileChange}
                                                        required={true}
                                                        className="w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                </label>
                                                <p>pdf, doc, txt</p>
                                                {ImageDocument.preview && (
                                                    <AiOutlineCloseCircle size={20} onClick={clearImage} className="absolute top-0 right-0 m-1 text-red-500 cursor-pointer" />
                                                )}
                                            </div>
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
                                            disabled={isLoadingLabelPost}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            {isLoadingLabelPost ? <BeatLoader color="#ffffff" /> : 'Submit'}
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