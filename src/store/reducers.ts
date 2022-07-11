import { combineReducers } from "redux";
// Layout
import Layout from "./layout/reducer";
//Dashboard
import DashStatistics from "./dashboard/statistics/reducer";
import DashMap from "./dashboard/map/reducer";
//Affiliates
import Affiliates from "./affiliates/reducer";
//AffProfile
import AffProfile from "./affiliates/profile/reducer";
//AffPayouts
import AffPayouts from "./affiliatePayouts/reducer";
//Geo
import Geo from "./geo/reducer";
//Campaigns
import Campaigns from "./campaigns/reducer";
//Registrations
import Registrations from "./registrations/reducer";
//RegFiles
import RegFiles from "./regFiles/reducer";
//PostbackLogs
import PostbackLogs from "./postback_logs/reducer";
//Postback
import Postbacks from "./postback/reducer";
//Reports
import Reports from "./reports/reducer";
//Brands
import Brands from "./brands/reducer";
import BrandProfile from "./brands/profile/reducer";
//BrandPayouts
import BrandPayouts from "./brandPayouts/reducer";
//Countries
import Countries from "./countries/reducer";
//Integrations
import Integrations from "./integrations/reducer";
//Redistribution
import Redistribution from "./redistribution/reducer";
// User Profile
import Profile from "./auth/profile/reducer";
// Forget Password
import forgetPassword from "./auth/forgetpwd/reducer";
import Languages from "./languages/reducer";
import badRequests from "./badRequests/reducer";
import CampaignRows from "./campaignsRow/reducer";

import Offers from "./offers/reducer";

import authUser from "./authUser/reduser";
import { AuthUserActionEnum } from "./authUser/actionTypes";

const rootReducer = combineReducers({
  // public
  Layout,
  Affiliates,
  AffProfile,
  AffPayouts,
  Geo,
  Campaigns,
  Registrations,
  PostbackLogs,
  Postbacks,
  Countries,
  Integrations,
  Brands,
  BrandProfile,
  BrandPayouts,
  Reports,
  Redistribution,
  Profile,
  forgetPassword,
  Languages,
  badRequests,
  CampaignRows,
  Offers,
  RegFiles,
  authUser,
  DashStatistics,
  DashMap,
});

export default (state: any, action: any) =>
  rootReducer(
    action.type === AuthUserActionEnum.LOGOUT ? undefined : state,
    action
  );
