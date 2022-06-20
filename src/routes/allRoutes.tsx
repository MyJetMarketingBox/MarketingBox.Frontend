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
import Redistribution from "../pages/Redistribution";
import AddRedistribution from "../pages/Redistribution/components/add";
import RegFileDetail from "../pages/RegFiles/components/detail/index";
import CampaignDetail from "src/pages/Campaigns/components/detail/CampaignDetail";
import GeoDetail from "src/pages/Geo/components/detail/index";
import OffersPage from "src/pages/Offers/OffersPage";
import OfferDetatils from "src/pages/Offers/detail/OfferDetatils";
import ForgetPassword from "src/pages/Authentication/ForgetPassword";
import ResetPassword from "src/pages/Authentication/ResetPassword";
import ConfirmEmailPage from "src/pages/ConfirmEmail/ConfirmEmailPage";

const routesList: RouteItemsType[] = [
  {
    path: Page.PROFILE,
    component: UserProfile,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.DASHBOARD,
    component: Dashboard,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.AFFILIATES,
    component: Affiliates,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.AFFILIATE,
    component: Affiliate,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REPORTS,
    component: Reports,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REGISTRATIONS,
    component: Registrations,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.INTEGRATIONS,
    component: Integrations,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.GEO_EDIT,
    component: GeoDetail,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REDISTRIBUTION,
    component: Redistribution,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REDISTRIBUTION_ADD,
    component: AddRedistribution,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REDISTRIBUTION_TAB,
    component: Redistribution,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.REDISTRIBUTION_FILES_DETAIL,
    component: RegFileDetail,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.INTEGRATION,
    component: Integration,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.CAMPAIGNS,
    component: Campaigns,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },

  {
    path: Page.CAMPAIGN,
    component: CampaignDetail,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.CAMPAIGN_TAB,
    component: Campaigns,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.POSTBACK_LOGS,
    component: Postbacklogs,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.POSTBACK,
    component: Postback,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.BRANDS,
    component: Brands,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.BRAND,
    component: Brand,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },
  {
    path: Page.PAYOUTS,
    component: Payouts,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },

  {
    path: Page.OFFERS,
    component: OffersPage,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },

  {
    path: Page.OFFERS_DETAIL_TAB,
    component: OfferDetatils,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: false,
  },

  {
    path: Page.OFFERS_DETAIL,
    component: OfferDetatils,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: false,
  },
  // OfferDetatils

  {
    path: Page.CONFIRM_EMAIL,
    component: ConfirmEmailPage,
    layoutType: RouteLayoutTypeEnum.Authorized,
    strict: true,
    exact: true,
  },

  {
    path: Page.SIGN_IN,
    component: Login,
    layoutType: RouteLayoutTypeEnum.SignFlow,
    strict: true,
    exact: true,
  },
  {
    path: Page.SIGN_UP,
    component: Register,
    layoutType: RouteLayoutTypeEnum.SignFlow,
    strict: true,
    exact: true,
  },

  {
    path: Page.FORGOT_PASSWORD,
    component: ForgetPassword,
    layoutType: RouteLayoutTypeEnum.SignFlow,
    strict: true,
    exact: true,
  },

  {
    path: Page.RESET_PASSWORD,
    component: ResetPassword,
    layoutType: RouteLayoutTypeEnum.SignFlow,
    strict: true,
    exact: true,
  },
  {
    path: Page.SIGN_OUT,
    component: Logout,
    layoutType: RouteLayoutTypeEnum.Public,
    strict: true,
    exact: true,
  },
];

export default routesList;
