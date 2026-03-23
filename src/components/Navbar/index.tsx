import * as React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdOutlineMenu, MdClear } from 'react-icons/md'
import { FaBars, FaHome, FaLinkedin, FaQuora } from "react-icons/fa";
import { FiLink, FiYoutube } from "react-icons/fi";
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
    const compactIconSize = Math.max(size - 2, 12);
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
                <div className="flex justify-between h-10 items-center px-4 sm:px-4">
                    <div className="flex items-center gap-2">
                        {
                            isOpen ? <MdClear color={'#ffffff'} size={compactIconSize} className=" cursor-pointer" onClick={toggleMenu} /> : <MdOutlineMenu color={'#ffffff'} size={compactIconSize} className=" cursor-pointer"  onClick={toggleMenu} />
                        }
                        {/* <MdOutlineMenu color={'#ffffff'} className=" cursor-pointer" size={size}  onClick={toggleMenu} /> */}
                        <img src="/logo.svg" alt="FM Digital Logo" className="h-16 w-20 cursor-pointer" /> 
                    </div>

                    <div className="relative">
                        <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaUserCircle color={'#ffffff'} className="text-lg sm:text-xl md:text-2xl" />
                            {/* {isMenuOpen ? 
                                <FaChevronUp color="#ffffff" /> : 
                                <FaChevronDown color="#ffffff" />
                            } */}
                        </div>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link 
                                    to="/dashboard?tab=overview"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Account
                                </Link>
                                {/* <Link 
                                    to="/dashboard?tab=achievements"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Achievements
                                </Link> */}
                                <Link 
                                    to="/dashboard?tab=subscription"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Subscription
                                </Link>
                                {/* <Link 
                                    to="/dashboard?tab=refer"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Refer a Friend
                                </Link> */}
                                
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        logOut();
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
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
                                                    <div onClick={toggleDropdown} className='cursor-pointer flex items-center font-semibold text-gray-400 py-2.5 capitalize transition-all duration-300'>
                                                        <span className=' mr-2 grid place-items-center transition-all duration-300 '>{icon}</span>
                                                        {name}
                                                        {/* <span className='ml-2 mt-1'>
                                                            {openDropdownIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                                        </span> */}
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
                                                            className={({ isActive }) => isActive ? 'flex items-center text-gray-100 py-2.5 capitalize transition-all duration-300 font-semibold' : 'flex items-center font-semibold text-gray-400 py-2.5 capitalize transition-all duration-300 '} end>
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

