import { combineReducers } from "redux"

// Layout
import Layout from "./layout/reducer";

//Affiliates
import Affiliates from "./affiliates/reducer"

//AffProfile
import AffProfile from "./affiliates/profile/reducer"

//AffPayouts
import AffPayouts from "./affiliatePayouts/reducer"

//Geo
import Geo from "./geo/reducer"

//Campaigns
import Campaigns from "./campaigns/reducer"

//Registrations
import Registrations from "./registrations/reducer"

//PostbackLogs
import PostbackLogs from "./postback_logs/reducer"

//Postback
import Postback from "./postback/reducer"

//Reports
import Reports from "./reports/reducer"

//Brands
import Brands from "./brands/reducer"

//Countries
import Countries from "./countries/reducer"

//Integrations
import Integrations from "./integrations/reducer"

//login
import login from "./auth/login/reducer";

//register
import register from "./auth/register/reducer";

// User Profile
import profile from "./auth/profile/reducer";

// Forget Password
import forgetPassword from "./auth/forgetpwd/reducer";

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
  Postback,
  Countries,
  Integrations,
  Brands,
  Reports,
  login,
  register,
  profile,
  forgetPassword,
})

export default rootReducer
