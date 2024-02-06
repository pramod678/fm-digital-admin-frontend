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
import { EarningOption, FinancialDto, RequestedOptions, SelectCommission } from "../../../types/financial";
import SelectEarnings from "../../../ui/SelectEarnings";
import SelectC from "../../../ui/SelectC";
import { FinancialPostApi } from "../../../api/financial";
import ReusableSelect from "../../../ui/ReusableSelect";

export default function AddFundRequest({ userData }: { userData: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();

    
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<FinancialDto>()

    const { mutate: FinancialPost, isLoading: isLoadingFinancialPost } = FinancialPostApi(setIsOpen, reset)

    const onSubmit = handleSubmit(async (data: any) => {
        const newData: any = { ...data };
        newData.total_amount = Number(newData.total_amount)
        newData.cPercents = Number(newData.cPercents)
        FinancialPost(newData)
    });




    return (
        <>
            <button
                className="flex items-center text-sm justify-center ml-2 py-2 px-2 bg-neutral-800 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 mb-4 rounded-md"
                onClick={() => setIsOpen(true)}
            >
                <AiOutlinePlus size={size} />
                Add Fund Request
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
                                    Add Funding Request
                                </Dialog.Title>
                                <form onSubmit={(e: any) => {
                                    onSubmit(e);
                                }}>
                                    <div className="mt-2">

                                        <div className="w-full mb-2">
                                            <Label text="Total Amount" htmlFor="grid-amount" required={true} />
                                            <InputField
                                                type="number"
                                                name="total_amount"
                                                placeholder="Enter amount"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="amount is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Date" htmlFor="grid-date" required={true} />
                                            <InputField
                                                type="date"
                                                name="month_date"
                                                placeholder="Enter date"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="date is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Earning Resources" htmlFor="grid-resources" required={true} />
                                            <SelectEarnings control={control} name="earning_resources" options={EarningOption} errors={errors} required={true} />
                                        </div>

                                        
                                        <div className="w-full mb-2">
                                            <Label text="Vendor" htmlFor="grid-Vendor" required={true} />
                                            <InputField
                                                type="text"
                                                name="vender"
                                                placeholder="Enter vender"
                                                register={register}
                                                errors={errors}
                                                requiredMessage="vender is required."
                                            />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="Requested By" htmlFor="grid-requested_by" required={true} />
                                            <ReusableSelect control={control} name="requested_by" options={RequestedOptions} errors={errors} required={true} />
                                        </div>

                                        <div className="w-full mb-2">
                                            <Label text="C%" htmlFor="grid-c" required={true} />
                                            <SelectC control={control} name="cPercents" options={SelectCommission} errors={errors} required={true} />
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
                                            disabled={isLoadingFinancialPost}
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                                        >
                                            {isLoadingFinancialPost ? <BeatLoader color="#ffffff" /> : 'Submit'}
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