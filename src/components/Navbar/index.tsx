import * as React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineMenu, MdClear } from 'react-icons/md'
import { FaBars, FaHome, FaLinkedin, FaQuora } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiLink, FiYoutube } from "react-icons/fi";
import { AiFillTag, AiOutlinePlusCircle, AiTwotoneHome } from "react-icons/ai";
import { TbTool } from "react-icons/tb";
import { BsPersonFillGear, BsTicketPerforated } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { UserDataApi } from "../../api/releaseInfo";
import { IoMdWallet } from "react-icons/io";
import useAuthStore from "../../store/userstore";


interface props {
    isOpen: boolean;
    setIsOpen: any
}


export default function Index({ isOpen, setIsOpen }: props) {

    const navigate = useNavigate();
    const location = useLocation();
    const size = useResponsiveIconSize();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = React.useState<number | null>(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const logOut = () => {
        localStorage.clear();
        navigate('/sign-in');
    };

    const [userData, setUserData] = React.useState<any>("");

    const token = localStorage.getItem("token")

    //Api calls
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)


    React.useEffect(() => {
        getUserData({ token: token })
    }, []);
    
    const { userType, setUserType } = useAuthStore()
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


    const routes = getRoutes();

    function getRoutes() {
        // Choose routes based on the user's role
        const routes = userType === "Admin" ? AdminRoutes : Userroutes;

        return routes;
    }
    
    return (
        <>
            <div className="bg-neutral-800">
                <div className="flex justify-between h-[8vh] items-center px-4 py-1 sm:py-2 md:py-3 sm:px-4">
                    <div className="flex items-center gap-2">
                        {
                            isOpen ? <MdClear color={'#ffffff'} size={size} className=" cursor-pointer" onClick={toggleMenu} /> : <MdOutlineMenu color={'#ffffff'} size={size} className=" cursor-pointer"  onClick={toggleMenu} />
                        }
                        {/* <MdOutlineMenu color={'#ffffff'} className=" cursor-pointer" size={size}  onClick={toggleMenu} /> */}
                        <p className="text-white font-semibold tracking-wider leading-none text-base sm:text-lg md:text-xl lg:text-2xl ">
                            FM DIGITAL
                        </p>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <Link to={`/userDetails/${userData?.users_id}`} className="no-underline text-black">
                            <FaUserCircle color={'#ffffff'} className="text-xl sm:text-2xl md:text-3xl" />
                        </Link>
                        <div>
                            <span className="text-sm text-white cursor-pointer sm:text-base md:text-lg " onClick={logOut}>
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-1 transition-all ease-in-out duration-100 ${isOpen ? 'block' : 'hidden'} block sm:hidden justify-center items-center z-10`}>
                    <div className=" flex flex-col">
                        {
                            routes.map((link, index) => {
                                const { path, icon, name, subRoutes } = link;
                                const toggleDropdown = () => {
                                    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
                                };
                                return (
                                    <>
                                        {
                                            subRoutes ? (
                                                <>
                                                    <div onClick={toggleDropdown} className='cursor-pointer flex items-center font-semibold text-gray-400 py-3 capitalize transition-all duration-300'>
                                                        <span className=' mr-2 grid place-items-center transition-all duration-300 '>{icon}</span>
                                                        {name}
                                                        <span className='ml-2 mt-1'>
                                                            {openDropdownIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                                                        </span>
                                                    </div>
                                                    {openDropdownIndex === index && subRoutes && subRoutes.map((subLink) => {
                                                        const { path, icon, name } = subLink;
                                                        return (
                                                            <NavLink to={path} onClick={() => setIsOpen(!isOpen)}
                                                                className={({ isActive }) => isActive ? 'flex items-center text-gray-100 py-3 capitalize transition-all duration-300 font-semibold' : 'flex items-center font-semibold text-gray-400 py-3 capitalize transition-all duration-300 '} end>
                                                                <span className=' mr-2 grid place-items-center transition-all duration-300 '>{icon}</span>
                                                                {name}
                                                            </NavLink>
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                    <div onClick={toggleDropdown} className='cursor-pointer'>
                                                            <NavLink to={path} onClick={() => setIsOpen(!isOpen)}
                                                            className={({ isActive }) => isActive ? 'flex items-center text-gray-100 py-3 capitalize transition-all duration-300 font-semibold' : 'flex items-center font-semibold text-gray-400 py-3 capitalize transition-all duration-300 '} end>
                                                            <span className=' mr-2 grid place-items-center transition-all duration-300 '>{icon}</span>
                                                            {name}
                                                        </NavLink>
                                                    </div>
                                                </>
                                            )
                                        }

                                    </>
                                );
                            })
                        }
                    </div>

                </div>

            </div>
        </>
    )
}

