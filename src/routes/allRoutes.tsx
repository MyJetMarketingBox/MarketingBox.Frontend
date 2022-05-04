import { Redirect } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Dashboard";

import Affiliates from "../pages/Affiliates";
import Affiliate from "../pages/Affiliates/view";

import Reports from "../pages/Reports";

import Registrations from "../pages/Registrations";

import Integrations from "../pages/Integrations";
import Integration from "../pages/Integrations/detail";

import Campaigns from "../pages/Campaigns";

import Postbacklogs from "../pages/PostbackLogs";

import Postback from "../pages/Postback";

import Brands from "../pages/Brands";
import Brand from "../pages/Brands/components/detail";

import Payouts from "../pages/Payouts";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import { RouteLayoutTypeEnum } from "../enums/RouteLayoutTypeEnum";
import { RouteItemsType } from "../types/RouteItemsType";
import Page from "../constants/pages";
import UserProfile from "../pages/Authentication/UserProfile";

const routesList: RouteItemsType[] = [
  {
    path: Page.PROFILE,
    component: UserProfile,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.DASHBOARD,
    component: Dashboard,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.AFFILIATES,
    component: Affiliates,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.AFFILIATE,
    component: Affiliate,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.REPORTS,
    component: Reports,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.REGISTRATIONS,
    component: Registrations,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.INTEGRATIONS,
    component: Integrations,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.INTEGRATION,
    component: Integration,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.CAMPAIGNS,
    component: Campaigns,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.POSTBACK_LOGS,
    component: Postbacklogs,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.POSTBACK,
    component: Postback,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.BRANDS,
    component: Brands,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.BRAND,
    component: Brand,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.PAYOUTS,
    component: Payouts,
    layoutType: RouteLayoutTypeEnum.Authorized,
  },
  {
    path: Page.SIGN_IN,
    component: Login,
    layoutType: RouteLayoutTypeEnum.SignFlow,
  },
  {
    path: Page.SIGN_UP,
    component: Register,
    layoutType: RouteLayoutTypeEnum.SignFlow,
  },
  {
    path: Page.SIGN_OUT,
    component: Logout,
    layoutType: RouteLayoutTypeEnum.SignFlow,
  },
];

export default routesList;
