import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";

import Affiliates from "../pages/Affiliates";
import Affiliate from "../pages/Affiliates/view";

import Reports from "../pages/Reports";

import Registrations from "../pages/Registrations";

import Campaigns from "../pages/Campaigns";

import Postbacklogs from "../pages/PostbackLogs"

import Postback from "../pages/Postback";

import Brands from "../pages/Brands";

//Authentication pages
import Login from "src/pages/Authentication/Login";
import Logout from "src/pages/Authentication/Logout";
import Register from "src/pages/Authentication/Register";
import userProfile from "src/pages/Authentication/user-profile";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const userRoutes: Array<RouteProps> = [
  //User Profile
  { path: "/profile", component: userProfile },

  //dashboard
  { path: "/dashboard", component: Dashboard },

  { path: "/Affiliates", component: Affiliates },
  { path: "/Affiliates/view/:id", component: Affiliate },

  { path: "/Reports", component: Reports },

  { path: "/Registrations", component: Registrations },

  { path: "/Campaigns", component: Campaigns },
  { path: "/Postback_logs", component: Postbacklogs },
  { path: "/Postback", component: Postback},
  { path: "/Brands", component: Brands },

  // this route should be at the end of all components routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },
];

export { userRoutes, authRoutes };
