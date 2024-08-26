import React from "react";

import MainDashboard from "views/admin/default/components";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";
import RTLDefault from "views/admin/gestionP";
import Portfolio from "views/admin/portfolio";
import Event from "views/admin/event/event";
import SignIn from "views/auth/SignIn";
import Register from "views/auth/SignUp"
import GestionOffres from "views/admin/gestionOffres/index";
import Offres from "views/admin/offres/index";
import Postulations from "views/admin/postulation/index";

import { FaUsers } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";


import {
  MdHome,
  MdEvent,
  MdBarChart,
  MdPerson,
  MdOutlineEventNote,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6 text-[#662483]" />,
    component: <MainDashboard />,
  },
  {
    name: "Utilisateurs",
    layout: "/admin",
    path: "Utilisateurs",
    icon: <FaUsers className="h-6 w-6 text-[#662483]" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Actualités",
    layout: "/admin",
    path: "Event",
    icon: <MdEvent className="h-6 w-6 text-[#662483]" />,
    component: <Event />,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    path: "portfolioList",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6 text-[#662483]" />,
    component: <Portfolio />,
  },
  {
    name: "Offres",
    layout: "/admin",
    path: "offreList",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6 text-[#662483]" />,
    component: <Offres />,
  },
  {
    name: "Postulations",
    layout: "/admin",
    path: "postulationList",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6 text-[#662483]" />,
    component: <Postulations />,
  },
  {
    name: "Gestion portfolio",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6 text-[#662483]" />,
    path: "RTLDefault",
    component: <RTLDefault />,
  },
  {
    name: "Gestion D'actualités",
    layout: "/admin",
    path: "data-tables",
    icon: <MdOutlineEventNote className="h-6 w-6 text-[#662483]" />,
    component: <DataTables />,
  },
  {
    name: "Gestion D'offres",
    layout: "/admin",
    path: "gestion-offres",
    icon: <MdOutlineEventNote className="h-6 w-6 text-[#662483]" />,
    component: <GestionOffres />,
  },
  {
    name: "Se déconnecter",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6 text-[#662483]" />,
    component: <SignIn />,
  },
  {
    name: "S'inscrire",
    layout: "/auth",
    path: "register",
    icon: <MdPerson className="h-6 w-6 text-[#662483]" />,
    component: <Register />,
  },

];
export default routes;
