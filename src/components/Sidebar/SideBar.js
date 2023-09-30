import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaQuora } from "react-icons/fa";
import { FiLink, FiYoutube } from "react-icons/fi";
import { CgProfile } from "react-icons/bi";
import { MdOutlineLabel } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TbTool } from "react-icons/tb";
import { BsTicketPerforated } from "react-icons/bs";
import { ImFileMusic } from "react-icons/im";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/ReleseInfo",
    name: "CReleseInfo",
    icon: <AiOutlinePlusCircle />,
  },
  {
    path: "/Catalogs",
    name: "Catalogs",
    icon: <ImFileMusic />,
  },

  {
    path: "/Tools",
    name: "Tools",
    icon: <TbTool />,
    exact: true,
    subRoutes: [
      {
        path: "/Tools/YoutubeClaims",
        name: "Youtube Claims",
        icon: <FiYoutube />,
      },
      {
        path: "/Tools/ProfileLinking",
        name: "Profile Linking",
        icon: <FiLink />,
      },
    ],
  },
  {
    path: "/Label",
    name: "Label",
    icon: <MdOutlineLabel />,
  },
  {
    path: "/Tickets",
    name: "Tickets",
    icon: <BsTicketPerforated />,
  },
  {
    path: "/FAQ",
    name: "FAQ",
    icon: <FaQuora />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  FM-Digital
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        
      </div>
    </>
  );
};

export default SideBar;
