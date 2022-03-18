import { all, fork } from "redux-saga/effects"

//Layout
import LayoutSaga from "./layout/saga";

//Login
import authSaga from "./auth/login/saga";

//Affiliates
import affiliatesSaga from "./affiliates/saga";

//Campaigns
import campaignsSaga from "./campaigns/saga";

//Reports
import reportsSaga from "./reports/saga";

//Registrations
import registrationsSaga from "./registrations/saga";

//PostbackLogs
import postbackLogsSaga from "./postback_logs/saga"

//Postback
import postbackSaga from "./postback/saga";


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
    fork(campaignsSaga),
    fork(reportsSaga),
    fork(registrationsSaga),
    fork(postbackLogsSaga),
    fork(postbackSaga),
    //fork(registerSaga),
    //fork(ProfileSaga),
    //fork(forgetPasswordSaga)
  ])
}
