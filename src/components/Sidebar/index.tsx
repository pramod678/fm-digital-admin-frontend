import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaQuora, FaTwitter, FaYoutube, FaTools, FaHeadset, FaUserCog, FaMoneyBillWave } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiLink, FiYoutube } from "react-icons/fi";
import { AiFillTag, AiOutlinePlusCircle } from "react-icons/ai";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { BsPersonFillGear } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import useResponsiveIconSize from "../../hooks/useResponsiveIconSize";
import { IoMdWallet } from "react-icons/io";
import useAuthStore from "../../store/userstore";
import useServiceStatus from "../../hooks/useServiceStatus";

interface props {
    isOpen: boolean;
    setIsOpen: any
}

export default function Index({ isOpen, setIsOpen }: props) {

    const size = useResponsiveIconSize();
    const [openDropdownIndex, setOpenDropdownIndex] = React.useState<number | null>(null);
    const { userType } = useAuthStore()
    const location = useLocation();
    const { isActive: serviceActive, message: serviceMessage } = useServiceStatus();
    const [showServiceMsg, setShowServiceMsg] = React.useState(false);

    // Define routes with Icon Components, not Elements, to allow dynamic coloring
    const Userroutes = [
        {
            path: "/",
            name: "Home",
            icon: FaHome,
        },

        {
            path: "/Catalogs",
            name: "Catalog",
            icon: ImFileMusic,
        },
        {
            path: "/Tools",
            name: "Tools",
            icon: FaTools,
            exact: true,
            subRoutes: [
                {
                    path: "/Tools/YoutubeClaims",
                    name: "Youtube Claims",
                    icon: FiYoutube,
                },
                {
                    path: "/Tools/ProfileLinking",
                    name: "Profile Linking",
                    icon: FiLink,
                },
            ],
        },
        {
            path: "/Label",
            name: "Label",
            icon: AiFillTag,
        },
        {
            path: "/Financial",
            name: "Financial",
            icon: FaMoneyBillWave,
        },
        {
            path: "/ManageArtist",
            name: "Manage Artist",
            icon: BsPersonFillGear,
        },

        {
            path: "/Tickets",
            name: "Tickets",
            icon: FaHeadset,
        },
        {
            path: "/FAQ",
            name: "FAQ",
            icon: FaQuora,
        },
    ];

    const AdminRoutes = [
        {
            path: "/",
            name: "Home",
            icon: FaHome,
        },
        {
            path: "/Catalogs",
            name: "Catalog",
            icon: ImFileMusic,
        },
        {
            path: "/ManageUser",
            name: "Manage User",
            icon: BsPersonFillGear,
            exact: true,
        },
        {
            path: "/Tools",
            name: "Tools",
            icon: FaTools,
            exact: true,
            subRoutes: [
                {
                    path: "/Tools/YoutubeClaims",
                    name: "Youtube Claims",
                    icon: FiYoutube,
                },
                {
                    path: "/Tools/ProfileLinking",
                    name: "Profile Linking",
                    icon: FiLink,
                },
            ],
        },
        {
            path: "/Label",
            name: "Label",
            icon: AiFillTag,
        },
        {
            path: "/Financial",
            name: "Financial",
            icon: FaMoneyBillWave,
        },
        {
            path: "/ManageArtist",
            name: "Manage Artist",
            icon: BsPersonFillGear,
        },
        {
            path: "/Tickets",
            name: "Tickets",
            icon: FaHeadset,
        },
    ]

    const handleUrlClick = (link: any) => {
        window.open(link, '_blank');
    };

    const routes = (userType === "Admin" || userType === "admin") ? AdminRoutes : Userroutes;

    const handleClick = (r: any, e: React.MouseEvent) => {
        if (r?.subRoutes) {
            setIsOpen(true); // Expand the sidebar
        }
    };

    // Helper to check if a route or its subroutes are active
    const isActiveRoute = (r: any) => {
        if (r.path === "/" && location.pathname === "/") return true;
        if (r.path !== "/" && location.pathname.startsWith(r.path)) return true;
        if (r.subRoutes) {
            return r.subRoutes.some((sub: any) => location.pathname.startsWith(sub.path));
        }
        return false;
    };

    return (
        <>
            {/* Mobile Overlay Background */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 sm:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div 
                className={`flex flex-col justify-between bg-white border-r border-gray-200 transition-all duration-300 ease-in-out py-3 h-full z-50 fixed inset-y-0 left-0 sm:relative overflow-hidden
                ${isOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full sm:translate-x-0 w-[260px] sm:w-[80px]'}`}
            >
                
                {/* Top Section: Logo & CTA */}
                <div className="flex flex-col items-center px-4 mb-2 gap-2 w-full">
                     {/* Logo */}
                     <div className="flex items-center justify-center h-20 w-full overflow-hidden shrink-0">
                        {isOpen ? (
                            <img src="/logo.svg" alt="FM Digital" className="h-full w-auto object-contain transition-all duration-500" />
                        ) : (
                            // Use a small part of logo or just the FM text if logo is too wide. 
                            // User provided logo.svg which is likely the full logo (black pill).
                            // We will try to show it scaled down or just the icon if possible.
                            // For smoothness, we can just fade it.
                            <img src="/logo.svg" alt="FM" className="h-8 w-auto object-contain" />
                        )}
                     </div>

                     {/* Create Release Button */}
                     <div className="w-full h-auto flex flex-col items-center justify-center relative">
                        {/* Expanded Button */}
                        <button 
                             onClick={() => {
                               if (!serviceActive) {
                                 setShowServiceMsg(true);
                                 return;
                               }
                               window.location.href = '/ReleseInfo';
                             }}
                             className={`flex items-center justify-center gap-2 px-4 h-10 w-full bg-white border border-gray-200 rounded-full shadow-sm transition-all duration-300 text-sm whitespace-nowrap overflow-hidden
                                ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none icon-only-mode'}
                                ${!serviceActive ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md hover:border-gray-300 text-gray-700 font-medium'}
                             `}
                        >
                            <AiOutlinePlusCircle size={18} />
                            Create Release
                        </button>
                        
                         {/* Collapsed Button (Icon Only) */}
                         <button 
                             onClick={() => {
                               if (!serviceActive) {
                                 setShowServiceMsg(true);
                                 return;
                               }
                               window.location.href = '/ReleseInfo';
                             }}
                             className={`absolute flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 transition-all duration-300
                                ${!isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'}
                                ${!serviceActive ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'}
                             `}
                         >
                            <AiOutlinePlusCircle size={20} />
                        </button>

                        {/* Service Unavailable Message */}
                        {showServiceMsg && !serviceActive && (
                          <div className="mt-2 w-full bg-amber-50 border border-amber-200 rounded-lg p-2.5 animate-in fade-in duration-200">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs text-amber-800 leading-relaxed">{serviceMessage || 'Service is currently unavailable.'}</p>
                              <button onClick={() => setShowServiceMsg(false)} className="text-amber-400 hover:text-amber-600 text-xs font-bold shrink-0">✕</button>
                            </div>
                          </div>
                        )}
                     </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                    {
                        routes?.map((r, index) => {
                            const isOpenDropdown = openDropdownIndex === index; 
                            const isParentActive = isActiveRoute(r);

                            const toggleDropdown = (e: React.MouseEvent) => {
                                e.stopPropagation();
                                setOpenDropdownIndex(openDropdownIndex === index ? null : index);
                            };

                            const Icon = r.icon;

                            return (
                                <div key={index}>
                                    {
                                        r?.subRoutes ? (
                                            <div className="flex flex-col">
                                                 <div 
                                                    className={`
                                                        w-full flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group
                                                        ${isParentActive || isOpenDropdown 
                                                            ? 'bg-gray-200/50 text-black font-semibold shadow-sm' 
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                                                        ${!isOpen ? 'justify-center' : 'justify-between'}
                                                    `}
                                                    onClick={(e) => {
                                                        if (!isOpen) {
                                                            setIsOpen(true);
                                                            setTimeout(() => setOpenDropdownIndex(index), 100);
                                                        } else {
                                                            toggleDropdown(e);
                                                        }
                                                    }}
                                                 >
                                                    <div className="flex items-center gap-4">
                                                        <Icon size={20} className={`${isParentActive || isOpenDropdown ? 'text-black' : 'text-gray-500 group-hover:text-black'}`} />
                                                        {isOpen && <span className="text-sm tracking-wide">{r.name}</span>}
                                                    </div>
                                                    {isOpen && (
                                                        <div className={`text-gray-400 transition-transform duration-200 ${isOpenDropdown ? 'rotate-180' : ''}`}>
                                                            {/* Simple triangle/arrow for tools */}
                                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                 </div>

                                                {/* Submenu */}
                                                {(isOpenDropdown && isOpen) && (
                                                    <div className="flex flex-col mt-1 space-y-1">
                                                        {r?.subRoutes?.map((s, i) => {
                                                            const SubIcon = s.icon;
                                                            return (
                                                                <NavLink 
                                                                    to={s.path} 
                                                                    key={s.path} 
                                                                    className={({ isActive }) => `
                                                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ml-4
                                                                        ${isActive 
                                                                            ? 'text-black font-semibold' 
                                                                            : 'text-gray-500 hover:text-black'}
                                                                    `}
                                                                >
                                                                        <span className="whitespace-nowrap">{s.name}</span>
                                                                </NavLink>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <NavLink 
                                                to={r.path} 
                                                key={r.path} 
                                                className={({ isActive }) => `
                                                    flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 group
                                                    ${isActive 
                                                        ? 'bg-gray-200/50 text-black font-semibold shadow-sm' 
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'}
                                                    ${!isOpen ? 'justify-center' : 'gap-4'}
                                                `}
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <Icon size={20} className={`${isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'}`} />
                                                        {isOpen && <span className="text-sm tracking-wide">{r.name}</span>}
                                                    </>
                                                )}
                                            </NavLink>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                {/* Footer Section: Connect & Toggle */}
                <div className="flex flex-col items-center gap-4 mt-auto px-4 pt-4 pb-2 border-t border-gray-100/50 shrink-0">
                    
                    {/* Connect with us */}
                    {isOpen && (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <p className="text-gray-500 text-xs font-medium">Connect with us</p>
                            <div className="flex gap-4">
                                <FaFacebook className="text-gray-800 text-lg cursor-pointer hover:scale-110 transition" />
                                <FaLinkedin className="text-gray-800 text-lg cursor-pointer hover:scale-110 transition" onClick={() => handleUrlClick("https://www.linkedin.com/in/fm-digital-043a34244/")} />
                                <FaInstagram className="text-gray-800 text-lg cursor-pointer hover:scale-110 transition" onClick={() => handleUrlClick("https://www.instagram.com/fmdigitalofficial/")} />
                                <FaYoutube className="text-gray-800 text-lg cursor-pointer hover:scale-110 transition" onClick={() => handleUrlClick("https://www.youtube.com/channel/UCtiKMeo0LJa8mUQNZIwRNsA")} />
                            </div>
                        </div>
                    )}

                    {/* Collapse Toggle Button */}
                    <div className={`w-full flex ${isOpen ? 'justify-end' : 'justify-center'} mt-2`}>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-gray-400 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                        >
                            <TbLayoutSidebarLeftCollapse size={24} className={`transform transition-transform ${!isOpen ? 'rotate-180' : ''}`} /> 
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}