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
        { name: "Adaptr", link: "https://www.adaptr.com/" },
        { name: "Amazon", link: "https://music.amazon.in/search" },
        { name: "Anghami", link: "https://www.anghami.com/" },
        { name: "Boomplay", link: "https://www.boomplay.com/" },
        { name: "ClaroMúsica", link: "https://app.fmdigitalofficial.com/" },
        { name: "Deezer", link: "https://www.deezer.com/" },
        { name: "FM Digital Stores maximizer", link: "https://app.fmdigitalofficial.com/" },
        { name: "Flo", link: "https://www.music-flo.com/" },
        { name: "Ganna", link: "https://gaana.com/" },
        { name: "Instagram & Facebook", link: "https://www.instagram.com/" },
        { name: "iTunes/Apple music", link: "https://www.apple.com/in/itunes/" },
        { name: "iHeartRadio", link: "https://www.iheart.com/" },
        { name: "Joox", link: "https://www.joox.com/" },
        { name: "KKBox", link: "https://www.kkbox.com/intl/" },
        { name: "Kuack Media", link: "https://kuackmedia.com/" },
        { name: "MediaNet & many smaller outlets", link: "https://medianet.mv/" },
        { name: "NetEase", link: "https://ir.netease.com/" },
        { name: "Pandora", link: "https://www.pandora.com/" },
        { name: "Saavn", link: "https://www.jiosaavn.com/" },
        { name: "Shazam", link: "https://www.shazam.com/" },
        { name: "Snapchat", link: "https://www.snapchat.com/" },
        { name: "Soundcloud", link: "https://soundcloud.com/" },
        { name: "Spotify", link: "https://open.spotify.com/" },
        { name: "Tencent", link: "https://www.tencentmusic.com/en-us/" },
        { name: "Tidal", link: "https://tidal.com/" },
        { name: "TikTok, Resso, Luna", link: "https://www.tiktok.com/" },
        { name: "Wynk", link: 'https://wynk.in/music' },
        { name: "Yandex Music (beta)", link: "https://music.yandex.com/" },
        { name: "YouTube Music", link: "https://www.youtube.com/" },
    ];


    return (
        <>
            <button
                type="submit"
                className="px-4 py-2 w-20 bg-cyan-500 text-xs text-white text-base rounded hover:bg-cyan-600 focus:outline-none "
                onClick={() => setIsOpen(true)}
            >
                <span className=" text-white font-semibold">Stores</span>
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
                                                        <a href={`${item?.link}`} target="_blank" >
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