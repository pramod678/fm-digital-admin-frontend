import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface RejectProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    itemName?: string;
}

export default function RejectProfileModal({ isOpen, onClose, onConfirm, itemName = "Release" }: RejectProfileModalProps) {
    const [reason, setReason] = useState("");

    const handleConfirm = () => {
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason("");
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-[110] overflow-y-auto"
                onClose={onClose}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-[2px]" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                        <div className="inline-block w-full max-w-[500px] p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-[32px] border border-gray-100 font-['Poppins']">
                            <Dialog.Title
                                as="h3"
                                className="text-sm font-semibold text-gray-700 mb-2 typo-table-cell"
                            >
                                Reason
                            </Dialog.Title>
                            
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Write a reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c26d]/20 focus:border-[#00c26d] transition-all text-sm text-gray-800 placeholder:text-gray-400 font-medium"
                                />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-[17px] font-bold text-gray-800 mb-1">
                                    Are you sure you want to <span className="text-red-500">Reject</span> {itemName} ?
                                </h4>
                                <p className="text-[12px] text-gray-500 font-medium">
                                    Please confirm the action before proceeding.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleConfirm}
                                    className="bg-[#00c26d] hover:bg-[#00a65d] text-white py-3 px-8 rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50 disabled:grayscale typo-btn-main"
                                    disabled={!reason.trim()}
                                >
                                    Yes, proceed
                                </button>
                                <button
                                    onClick={onClose}
                                    className="bg-white border border-[#e63946]/30 text-[#e63946] py-3 px-8 rounded-xl text-xs font-bold hover:bg-red-50 transition-all shadow-sm typo-btn-main"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
