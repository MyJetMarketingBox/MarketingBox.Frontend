import { combineReducers } from "redux"

// Layout
import Layout from "./layout/reducer";

//Affiliates
import Affiliates from "./affiliates/reducer"

//Registrations
import Registrations from "./registrations/reducer"

//Reports
import Reports from "./reports/reducer"

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
  Registrations,
  Reports,
  login,
  register,
  profile,
  forgetPassword
})

export default rootReducer
