import * as React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaQuora, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiLink, FiYoutube } from "react-icons/fi";
import { AiFillTag, AiOutlinePlusCircle } from "react-icons/ai";
import { TbTool } from "react-icons/tb";
import { BsPersonFillGear, BsTicketPerforated } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { IoMdWallet } from "react-icons/io";
import useAuthStore from "../../store/userstore";

interface props {
    isOpen: boolean;
    setIsOpen: any
}

export default function Index({ isOpen, setIsOpen }: props) {

    const size = useResponsiveIconSize();
    const [openDropdownIndex, setOpenDropdownIndex] = React.useState<number | null>(null);
    const { userType, setUserType } = useAuthStore()
    console.log(userType, "userType")
    const Userroutes = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaHome color={'#ffffff'} size={size} />,
        },
        {
            path: "/ReleseInfo",
            name: "Create Release",
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
            path: "/Financial",
            name: "Financial",
            icon: <IoMdWallet color={'#ffffff'} size={size} />,
        },
        {
            path: "/ManageArtist",
            name: "Manage Artist",
            icon: <BsPersonFillGear color={'#ffffff'} size={size} />,
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

    const AdminRoutes = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaHome color={'#ffffff'} size={size} />,
        },
        {
            path: "/Catalogs",
            name: "Catalogs",
            icon: <ImFileMusic color={'#ffffff'} size={size} />,
        },
        {
            path: "/ManageUser",
            name: "Manage User",
            icon: <BsPersonFillGear color={'#ffffff'} size={size} />,
            exact: true,
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
            path: "/Financial",
            name: "Financial",
            icon: <IoMdWallet color={'#ffffff'} size={size} />,
        },
        {
            path: "/ManageArtist",
            name: "Manage Artist",
            icon: <BsPersonFillGear color={'#ffffff'} size={size} />,
        },
        {
            path: "/Tickets",
            name: "Tickets",
            icon: <BsTicketPerforated color={'#ffffff'} size={size} />,
        },
    ]
    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };
    console.log(userType === "Admin")


    const routes = getRoutes();

    console.log(routes, "routes")

    function getRoutes() {
        // Choose routes based on the user's role
        const routes = userType === "Admin" ? AdminRoutes : Userroutes;

        return routes;
    }


    const handleClick = (r: any, e: React.MouseEvent) => {
        if (r?.subRoutes) {
            setIsOpen(true); // Expand the sidebar
        }
    };



    return (
        <>
            <div className={`h-[92vh] hidden overflow-y-auto sm:block bg-neutral-800 ${isOpen ? 'sm:w-[18%] md:w-[18%] lg:w-[15%] ' : 'w-[50px]'}  py-4`}>
                <div className="flex flex-col gap-1">
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
                                                <div className={`w-full items-center flex sm:gap-2 lg:gap-4 px-4 py-1 cursor-pointer hover:bg-zinc-500 ${isOpen ? "" : "mb-2"} `} onClick={(e) => handleClick(r, e)}>
                                                    {r.icon}
                                                    <div className={`flex justify-between items-center ${isOpen ? "" : "hidden"} `} onClick={toggleDropdown}>
                                                        <p className={`md:text-sm text-white ${isOpen ? "" : "hidden"}`}>{r.name}</p>
                                                        <button className="text-icons text-xl ml-2">
                                                            {openDropdownIndex === index ? <FiChevronUp color={'#ffffff'} /> : <FiChevronDown color={'#ffffff'} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to={r.path} key={r.path} className={({ isActive }) => isActive ? "bg-zinc-500 " : ""
                                                } >
                                                    <div className={`w-full items-center flex sm:gap-2 lg:gap-4 px-4 py-1 cursor-pointer hover:bg-zinc-500 ${isOpen ? "" : "mb-1"} `}>
                                                        {r.icon}
                                                        <p className={`md:text-sm text-white ${isOpen ? "" : "hidden"}`}>{r.name}</p>
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
                                                        <p className={`md:text-sm text-white ${isOpen ? "" : "hidden"}`}>{s.name}</p>
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

                <div className={` ${!isOpen ? 'hidden' : 'block'} mt-60 bg-[#00CED1] h-14 flex flex-col items-center justify-center`}>
                    <p className="text-white text-center mb-0">Connect with us</p>
                    <div className="flex gap-3 mt-2">
                        <FaLinkedin className="text-white cursor-pointer" onClick={() => handleUrlClick("https://www.linkedin.com/in/fm-digital-043a34244/")} />
                        <FaYoutube className="text-white cursor-pointer" onClick={() => handleUrlClick("https://www.youtube.com/channel/UCtiKMeo0LJa8mUQNZIwRNsA")} />
                        <FaInstagram className="text-white cursor-pointer" onClick={() => handleUrlClick("https://www.instagram.com/fmdigitalofficial/")} />
                        <FaTwitter className="text-white cursor-pointer" onClick={() => handleUrlClick("https://twitter.com/AshishT97719445")} />
                    </div>
                </div>
            </div>
        </>
    )
}