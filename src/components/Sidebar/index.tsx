import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLinkedin, FaQuora } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiLink, FiYoutube } from "react-icons/fi";
import { AiFillTag, AiOutlinePlusCircle, AiTwotoneHome } from "react-icons/ai";
import { TbTool } from "react-icons/tb";
import { BsTicketPerforated } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import { LuMenu } from "react-icons/lu"
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";

interface props {
    isOpen:boolean;
    setIsOpen:any
}

export default function Index({ isOpen, setIsOpen }:props) {

    const size = useResponsiveIconSize();
    const [openDropdownIndex, setOpenDropdownIndex] = React.useState<number | null>(null);

    const routes = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaHome color={'#ffffff'} size={size} />,
        },
        {
            path: "/ReleseInfo",
            name: "Create Relese",
            icon: <AiOutlinePlusCircle color={'#ffffff'} size={size} />,
        },
        {
            path: "/Catalogs",
            name: "Catalogs",
            icon: <ImFileMusic color={'#ffffff'} size={size} />,
        },

        {
            path: "/Tools",
            name: "Tools",
            icon: <TbTool color={'#ffffff'} size={size} />,
            exact: true,
            subRoutes: [
                {
                    path: "/Tools/YoutubeClaims",
                    name: "Youtube Claims",
                    icon: <FiYoutube color={'#ffffff'} size={size} />,
                },
                {
                    path: "/Tools/ProfileLinking",
                    name: "Profile Linking",
                    icon: <FiLink color={'#ffffff'} size={size} />,
                },
            ],
        },
        {
            path: "/Label",
            name: "Label",
            icon: <AiFillTag color={'#ffffff'} size={size} />,
        },
        {
            path: "/Tickets",
            name: "Tickets",
            icon: <BsTicketPerforated color={'#ffffff'} size={size} />,
        },
        {
            path: "/FAQ",
            name: "FAQ",
            icon: <FaQuora color={'#ffffff'} size={size} />,
        },
    ];

    return (
        <>
            <div className={`h-[92vh] hidden sm:block bg-neutral-800 ${isOpen ? 'sm:w-[13%] md:w-[15%] lg:w-[14%] ' : 'w-[50px]'}  py-4`}>
                <div className="flex flex-col gap-1">
                    <div className="w-full items-center flex md:gap-2 px-4 py-1 cursor-pointer " onClick={() => setIsOpen((prev: any) => !prev)}>
                        <LuMenu color={'#ffffff'} size={size} />
                    </div>
                    {
                        routes?.map((r, index) => {
                            const isOpenDropdown = isOpen && r?.subRoutes;

                            const toggleDropdown = () => {
                                setOpenDropdownIndex(openDropdownIndex === index ? null : index);
                            };
                            return (
                                <>
                                    {
                                        r?.subRoutes ? (
                                            <>
                                                <div className="w-full items-center flex sm:gap-2 lg:gap-4 px-4 py-1 cursor-pointer hover:bg-zinc-500 ">
                                                    {r.icon}
                                                    <div className={`flex justify-between items-center ${isOpen ? "" : "hidden"} `} onClick={toggleDropdown}>
                                                        <p className={`md:text-sm lg:text-base text-white ${isOpen ? "" : "hidden"}`}>{r.name}</p>
                                                        <button className="text-icons text-xl ml-2">
                                                            {openDropdownIndex === index ? <FiChevronUp color={'#ffffff'} /> : <FiChevronDown color={'#ffffff'} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to={r.path} key={r.path} className={({ isActive }) => isActive ? "bg-zinc-500 " : ""
                                                }>
                                                    <div className="w-full items-center flex sm:gap-2 lg:gap-4 px-4 py-1 cursor-pointer hover:bg-zinc-500 ">
                                                        {r.icon}
                                                        <p className={`md:text-sm lg:text-base text-white ${isOpen ? "" : "hidden"}`}>{r.name}</p>
                                                    </div>
                                                </NavLink>
                                            </>
                                        )
                                    }
                                    {isOpenDropdown && openDropdownIndex === index && (
                                        <div className="flex flex-col gap-2">
                                            {r?.subRoutes?.map((s, i) => (
                                                <NavLink to={s.path} key={s.path} className={({ isActive }) => isActive ? "bg-zinc-500 " : ""
                                                } >
                                                    <div className="w-full items-center flex md:gap-2 lg:gap-4 px-4 py-1 cursor-pointer hover:bg-zinc-500 ">
                                                        {s.icon}
                                                        <p className={`md:text-sm lg:text-base text-white ${isOpen ? "" : "hidden"}`}>{s.name}</p>
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}