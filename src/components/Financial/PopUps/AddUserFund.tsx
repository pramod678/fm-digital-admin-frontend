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
import FileUpload from "../../../ui/fileupload";
import { AddUserFundDto, EarningOption, FinancialDto, RequestedOptions, SelectCommission } from "../../../types/financial";
import SelectEarnings from "../../../ui/SelectEarnings";
import SelectC from "../../../ui/SelectC";
import { FinancialPostApi, UserFinancialPostApi } from "../../../api/financial";
import ReusableSelect from "../../../ui/ReusableSelect";
import { GetAllUsersDataApi } from "../../../api/user";
import SelectUser from "../../../ui/SelectUser";
import cogoToast from "@successtar/cogo-toast";

export default function AddUserFund({ userData, totalPanelFund }: { userData: any, totalPanelFund: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();


    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<AddUserFundDto>()
    const { data: allUsersData } = GetAllUsersDataApi();

    const handleReset = () => {
        reset()
    }

    const handleClose = () => {
        setIsOpen(false)
    }


    const { mutate: UserFinancialPost, isLoading: isLoadingUserFinancialPost } = UserFinancialPostApi({ handleClose, handleReset })


    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.earning_amount = Number(newData.earning_amount)

        if (newData.earning_amount > totalPanelFund) {
            cogoToast.info("No Sufficient Fund")
        } else {
            if (newData.earning_amount > 0) {
                newData.admin_id = userData?.users_id
                UserFinancialPost(newData)
            } else {
                cogoToast.info("Amount should be greater than 0")
            }

        }
    });




    return (
        <>
            <button
                className="flex items-center text-sm justify-center ml-2 py-2 px-2 bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 mb-4 rounded-md"
                onClick={() => setIsOpen(true)}
            >
                <AiOutlinePlus size={size} />
                Add User Fund
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

                                {
                                    totalPanelFund === 0 ? (
                                        <>
                                            <p className="text-sm text-center font-bold p-4">No Sufficient Fund</p>
                                        </>
                                    ) : (
                                        <>
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg text-center font-medium leading-6 text-gray-900"
                                            >
                                                Add User Fund
                                            </Dialog.Title>
                                            <form onSubmit={(e: any) => {
                                                onSubmit(e);
                                            }}>
                                                <div className="mt-2">
                                                    <div className="w-full mb-2">
                                                        <Label text="User Id" htmlFor="grid-amount" required={true} />
                                                        <SelectUser control={control} name="users_id" options={allUsersData?.data?.data} errors={errors} required={true} />
                                                    </div>


                                                    <div className="w-full mb-2">
                                                        <Label text="Earning Amount" htmlFor="grid-amount" required={true} />
                                                        <InputField
                                                            type="text"
                                                            name="earning_amount"
                                                            placeholder="Enter amount"
                                                            register={register}
                                                            errors={errors}
                                                            requiredMessage="amount is required."
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
                                                        disabled={isLoadingUserFinancialPost}
                                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                                    >
                                                        {isLoadingUserFinancialPost ? <BeatLoader color="#ffffff" /> : 'Submit'}
                                                    </button>
                                                </div>

                                            </form>
                                        </>
                                    )
                                }

                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}