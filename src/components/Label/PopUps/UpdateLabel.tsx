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
import { LabelPostApi, UpdateLabelApi } from "../../../api/label";
import FileUpload from "../../../ui/fileupload";
import { FaEdit } from "react-icons/fa";




export default function UpdateLabel({ userData, labelData }: { userData: any, labelData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();
    const [file, setFile] = useState(null)
    const [ImageDocument, setImageDocument] = useState({ preview: "", data: "" });
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<LabelDto>({ defaultValues: labelData })


    const { mutate: UpdateLabel, isLoading } = UpdateLabelApi(labelData?.label_id, setIsOpen)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        let formData: any = new FormData();
        formData.append("labelDocument", file);
        formData.append("Status", 0);
        formData.append("title", newData.title);
        formData.append("youtubeURL", newData.youtubeURL);
        formData.append("users_id", parseInt(userData?.users_id));
        UpdateLabel(formData)
    });

    return (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 cursor-pointer" onClick={() => setIsOpen(true)}>
                <FaEdit />
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
                                    Update Label
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Channel Name" htmlFor="grid-title" required={true} />
                                            <InputField
                                                type="text"
                                                name="title"
                                                placeholder="Enter title"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="title is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Youtube Url" htmlFor="grid-youtubeURL" required={true} />
                                            <InputField
                                                type="text"
                                                name="youtubeURL"
                                                placeholder="Enter youtubeURL "
                                                register={register}
                                                errors={errors}
                                                requiredMessage="youtubeURL is required."
                                            />
                                        </div>

                                        <FileUpload file={file} setFile={setFile} />


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