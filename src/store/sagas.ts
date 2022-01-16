import { all, fork } from "redux-saga/effects"

//Layout
import LayoutSaga from "./layout/saga";

//Login
import authSaga from "./auth/login/saga";

//Affiliates
import affiliatesSaga from "./affiliates/saga";

//Reports
import reportsSaga from "./reports/saga";

//Register
import registerSaga from "./auth/register/saga";

//User Profile
import ProfileSaga from "./auth/profile/saga";

// Forget Password
import forgetPasswordSaga from "./auth/forgetpwd/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(authSaga),
    fork(affiliatesSaga),
    fork(reportsSaga),
    //fork(registerSaga),
    //fork(ProfileSaga),
    //fork(forgetPasswordSaga)
  ])
}
