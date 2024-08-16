import React from "react";

import MainDashboard from "views/admin/default/components";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";
import RTLDefault from "views/admin/gestionP";
import Portfolio from "views/admin/portfolio";
import Event from "views/admin/event/event";
import SignIn from "views/auth/SignIn";
import Register from "views/auth/SignUp"

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
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Utilisateurs",
    layout: "/admin",
    path: "Utilisateurs",
    icon: <FaUsers className="h-6 w-6"  />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "évènement",
    layout: "/admin",
    path: "Event",
    icon: <MdEvent  className="h-6 w-6" />,
    component: <Event/>,
  },
  {
    name: "portfolio",
    layout: "/admin",
    path: "portfolioList",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6" />,
    component: <Portfolio/>,
  },
  {
    name: "Gestion portfolio",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "RTLDefault",
    component: <RTLDefault/>,
  },
  {
    name: "Gestion D'évènement",
    layout: "/admin",
    path: "data-tables",
    icon: <MdOutlineEventNote className="h-6 w-6" />,
    component: <DataTables />,
  },

  {
    name: "Se déconnecter",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "S'inscrire",
    layout: "/auth",
    path: "register",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Register />,
  },
 
];
export default routes;
