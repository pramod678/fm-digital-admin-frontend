import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { LabelDto } from "../../../types/label";
import { LabelPostApi } from "../../../api/label";
import { GetAllUsersDataApi } from "../../../api/user";
import useAuthStore from "../../../store/userstore";
import FileUpload from "../../../ui/fileupload";
import cogoToast from "@successtar/cogo-toast";

export default function AddLabel({ userData }: { userData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [selectedUserId, setSelectedUserId] = useState("");
    
    const { userType } = useAuthStore();
    const isAdmin = userType === 'admin' || userType === 'Admin';
    const { data: allUsersData } = GetAllUsersDataApi(isAdmin);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LabelDto>()

    const { mutate: LabelPost, isLoading: isLoadingLabelPost } = LabelPostApi(setIsOpen, reset, setFile)

    const onSubmit = handleSubmit(async (data: LabelDto) => {
        if (!file) {
            cogoToast.error("Please upload a document");
            return;
        }

        if (isAdmin && !selectedUserId) {
            cogoToast.error("Please select a user");
            return;
        }

        const formData = new FormData();
        formData.append("labelDocument", file);
        formData.append("title", data.title);
        formData.append("youtubeURL", data.youtubeURL);
        formData.append("users_id", isAdmin ? selectedUserId : String(userData?.users_id));
        
        LabelPost(formData);
    });

    return (
        <>
            <button
                className="flex items-center gap-2 text-xs font-semibold py-1.5 px-3 bg-white text-[#00b768] border border-[#00b768] hover:bg-green-50 transition-colors rounded-lg whitespace-nowrap shadow-sm"
                onClick={() => setIsOpen(true)}
            >
                <AiOutlinePlus size={18} />
                Add Label
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
                            <div className="inline-block w-full max-w-lg p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-[30px] border border-gray-100">
                                <div className="relative px-6 py-5 border-b border-gray-100">
                                    <Dialog.Title as="h3" className="text-xl font-medium text-gray-800 text-center">
                                        Add Label
                                    </Dialog.Title>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <AiOutlineClose size={20} />
                                    </button>
                                </div>

                                <form onSubmit={onSubmit} className="p-6 pb-8">
                                    <div className="space-y-6">
                                        <div className="w-full">
                                            <FileUpload file={file} setFile={setFile} />
                                        </div>

                                        <div className="w-full">
                                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                                                Channel Name
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-2 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none text-sm placeholder:text-gray-300 transition-all shadow-sm`}
                                                placeholder="Enter Title"
                                                {...register("title", { required: "Title is required" })}
                                            />
                                            {errors.title && <p className="text-[10px] text-red-500 mt-1">{errors.title.message}</p>}
                                        </div>

                                        <div className="w-full">
                                            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                                                Youtube Url
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-2 rounded-xl border ${errors.youtubeURL ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none text-sm placeholder:text-gray-300 transition-all shadow-sm`}
                                                placeholder="www.youtube/channel%20name.com"
                                                {...register("youtubeURL", { required: "Youtube URL is required" })}
                                            />
                                            {errors.youtubeURL && <p className="text-[10px] text-red-500 mt-1">{errors.youtubeURL.message}</p>}
                                        </div>

                                        {isAdmin && (
                                            <div className="w-full">
                                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                                                    Select User
                                                </label>
                                                <div className="relative group">
                                                    <select
                                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00b768]/20 focus:border-[#00b768] outline-none text-sm text-gray-400 appearance-none bg-white cursor-pointer transition-all pr-12 shadow-sm"
                                                        onChange={(e) => setSelectedUserId(e.target.value)}
                                                        value={selectedUserId}
                                                    >
                                                        <option value="" disabled>Search User Id/Name</option>
                                                        {allUsersData?.data?.data?.map((user: any) => (
                                                            <option key={user.users_id} value={user.users_id} className="text-gray-800 text-xs">
                                                                {user.users_id} - {user.fname} {user.lname}
                                                        </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2 border-l pl-3 border-gray-200">
                                                        <IoMdArrowDropdown className="text-gray-900" size={18} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <button
                                            type="button"
                                            className="flex-1 py-2.5 px-6 text-lg font-medium text-gray-700 bg-white border border-[#d1d5db] rounded-xl hover:bg-gray-50 transition-all text-center shadow-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoadingLabelPost}
                                            className="flex-1 py-2.5 px-6 text-lg font-medium text-white bg-[#00b768] border border-transparent rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all flex items-center justify-center shadow-sm"
                                        >
                                            {isLoadingLabelPost ? <BeatLoader size={8} color="#ffffff" /> : 'Upload'}
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