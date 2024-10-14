import React from "react";
import MainDashboard from "views/admin/default/components";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";
import RTLDefault from "views/admin/gestionP";
import Portfolio from "views/admin/portfolio";
import Event from "views/admin/event/event";
import SignIn from "views/auth/SignIn";
import Register from "views/auth/SignUp";
import GestionOffres from "views/admin/gestionOffres/index";
import Offres from "views/admin/offres/index";
import Postulations from "views/admin/postulation/index";
import { FaUsers, FaNewspaper, FaBriefcase } from "react-icons/fa";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineFileSearch,
} from "react-icons/ai";
import {
  MdHome,
  MdEvent,
  MdSettings,
  MdPerson,
  MdOutlineEventNote,
  MdLock,
  MdLocalOffer,
} from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6 text-[#f06739]" />,
    component: <MainDashboard />,
  },
  {
    name: "Utilisateurs",
    layout: "/admin",
    path: "Utilisateurs",
    icon: <FaUsers className="h-6 w-6 text-[#f06739]" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Actualités",
    layout: "/admin",
    path: "Event",
    icon: <FaNewspaper className="h-6 w-6 text-[#f06739]" />,
    component: <Event />,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    path: "portfolioList",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6 text-[#f06739]" />,
    component: <Portfolio />,
  },
  {
    name: "Offres",
    layout: "/admin",
    path: "offreList",
    icon: <MdLocalOffer className="h-6 w-6 text-[#f06739]" />,
    component: <Offres />,
  },
  {
    name: "Postulations",
    layout: "/admin",
    path: "postulationList",
    icon: <BsFillFileEarmarkPostFill className="h-6 w-6 text-[#f06739]" />,
    component: <Postulations />,
  },
  {
    name: "Gestion portfolio",
    layout: "/admin",
    icon: <MdSettings className="h-6 w-6 text-[#f06739]" />,
    path: "RTLDefault",
    component: <RTLDefault />,
  },
  {
    name: "Gestion D'actualités",
    layout: "/admin",
    path: "data-tables",
    icon: <MdOutlineEventNote className="h-6 w-6 text-[#f06739]" />,
    component: <DataTables />,
  },
  {
    name: "Gestion D'offres",
    layout: "/admin",
    path: "gestion-offres",
    icon: <FaBriefcase className="h-6 w-6 text-[#f06739]" />,
    component: <GestionOffres />,
  },
  {
    name: "Se déconnecter",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6 text-[#f06739]" />,
    component: <SignIn />,
  },
  // {
  //   name: "S'inscrire",
  //   layout: "/auth",
  //   path: "register",
  //   icon: <MdPerson className="h-6 w-6 text-[#662483]" />,
  //   component: <Register />,
  // },
];

export default routes;
