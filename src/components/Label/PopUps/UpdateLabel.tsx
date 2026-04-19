import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import InputField from "../../../ui/InputField";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { UpdateLabelApi } from "../../../lib/endpoint";
import FileUpload from "../../../ui/fileupload";
import { FaEdit } from "react-icons/fa";




import { Label, LabelDto } from "../../../types/label";

export default function UpdateLabel({ userData, labelData }: { userData: any, labelData: Label }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LabelDto>({ defaultValues: labelData })


    const { mutate: UpdateLabel, isLoading } = UpdateLabelApi(labelData?.label_id, setIsOpen)

    const onSubmit = handleSubmit(async (data: LabelDto) => {
        const formData = new FormData();
        if (file) {
            formData.append("labelDocument", file);
        }
        formData.append("Status", "0"); // Resetting status to pending on update
        formData.append("title", data.title);
        formData.append("youtubeURL", data.youtubeURL);
        formData.append("users_id", String(userData?.users_id));
        
        UpdateLabel(formData);
    });

    return (
        <>
            <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(true)}
            >
                <FaEdit size={14} />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-lg p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl border border-gray-100">
                                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                                    <div className="w-6" /> {/* Spacer */}
                                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-800 text-center flex-grow">
                                        Update Label
                                    </Dialog.Title>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <AiOutlineCloseCircle size={24} />
                                    </button>
                                </div>

                                <form onSubmit={onSubmit} className="p-6">
                                    <div className="space-y-4">
                                        <div className="w-full">
                                            <FileUpload file={file} setFile={setFile} />
                                        </div>

                                        <div className="w-full">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Channel Name
                                            </label>
                                            <InputField
                                                type="text"
                                                name="title"
                                                placeholder="Enter Title"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Title is required."
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Youtube Url
                                            </label>
                                            <InputField
                                                type="text"
                                                name="youtubeURL"
                                                placeholder="Enter Youtube URL"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="Youtube URL is required."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <button
                                            type="button"
                                            className="flex-1 py-3 px-6 text-lg font-bold text-gray-800 bg-white border border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all text-center"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 py-3 px-6 text-lg font-bold text-white bg-[#00b768] border border-transparent rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all flex items-center justify-center"
                                        >
                                            {isLoading ? <BeatLoader size={8} color="#ffffff" /> : 'Update'}
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
