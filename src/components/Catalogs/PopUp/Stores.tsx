import * as React from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import useResponsiveIconSize from "../../../hooks/useResponsiveIconSize";
import { useNavigate } from "react-router-dom";


export default function Stores() {
    const [isOpen, setIsOpen] = useState(false);
    const size = useResponsiveIconSize();
    const navigate = useNavigate();
    const data = [
        { name: "Adaptr" },
        { name: "Amazon", link: "https://music.amazon.in/search" },
        { name: "Anghami" },
        { name: "Boomplay" },
        { name: "ClaroMúsica" },
        { name: "Deezer" },
        { name: "FM Digital Stores maximizer" },
        { name: "Flo" },
        { name: "Ganna" },
        { name: "Instagram & Facebook" },
        { name: "iTunes/Apple music" },
        { name: "iHeartRadio" },
        { name: "Joox" },
        { name: "Joox" },
        { name: "KKBox" },
        { name: "Kuack Media" },
        { name: "MediaNet & many smaller outlets" },
        { name: "NetEase" },
        { name: "Pandora" },
        { name: "Saavn" },
        { name: "Shazam" },
        { name: "Snapchat" },
        { name: "Soundcloud" },
        { name: "Spotify" },
        { name: "Tencent" },
        { name: "Tidal" },
        { name: "TikTok, Resso, Luna" },
        { name: "Wynk" },
        { name: "Yandex Music (beta)" },
        { name: "YouTube Music", link:"https://www.youtube.com/" },
    ];


    return (
        <>
            <button
                type="submit"
                className="px-4 py-2 bg-cyan-500 w-16 text-xs text-white text-base rounded hover:bg-cyan-600 focus:outline-none flex items-center"
                onClick={() => setIsOpen(true)}
            >
                <span className="mr-2 text-white font-semibold">Stores</span>
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
                            <div className="inline-block w-[70%] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg text-center font-medium leading-6 text-gray-900"
                                >
                                    Stores
                                </Dialog.Title>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">

                                    {
                                        data?.map((item: any, index) => {
                                            return (
                                                <div key={index} className="flex items-center mb-4">
                                                    <label className="cursor-pointer" >
                                                        <a href={`${item?.link}`}>
                                                            <input type="checkbox" checked className="mr-2" />
                                                            {item.name}
                                                        </a>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}