import { all, fork } from "redux-saga/effects"

//Layout
import LayoutSaga from "./layout/saga";

//Login
import authSaga from "./auth/login/saga";

//Affiliates
import affiliatesSaga from "./affiliates/saga";

//AffProfile
import affProfileSaga from "./affiliates/profile/saga";

//AffPayouts
import affPayoutsSaga from "./affiliatePayouts/saga";

//Campaigns
import campaignsSaga from "./campaigns/saga";

//Reports
import reportsSaga from "./reports/saga";

//Brands
import brandsSaga from "./brands/saga";
import brandSaga from "./brands/profile/saga";

//BrandPayouts
import brandPayoutsSaga from "./brandPayouts/saga";

//Countries
import countriesSaga from "./countries/saga";

//Integrations
import integrationsSaga from "./integrations/saga"

//Registrations
import registrationsSaga from "./registrations/saga";

//PostbackLogs
import postbackLogsSaga from "./postback_logs/saga"

//Postback
import postbackSaga from "./postback/saga";

//Geo
import geoSaga from "./geo/saga";


//Register
import registerSaga from "./auth/register/saga";

//User Profile
import ProfileSaga from "./auth/profile/saga";

// Forget Password
import forgetPasswordSaga from "./auth/forgetpwd/saga"
import languageSaga from "./languages/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(authSaga),
    fork(affiliatesSaga),
    fork(affProfileSaga),
    fork(affPayoutsSaga),
    fork(campaignsSaga),
    fork(reportsSaga),
    fork(registrationsSaga),
    fork(postbackLogsSaga),
    fork(brandsSaga),
    fork(brandSaga),
    fork(brandPayoutsSaga),
    fork(countriesSaga),
    fork(integrationsSaga),
    fork(geoSaga),
    fork(languageSaga),
    //fork(registerSaga),
    //fork(ProfileSaga),
    //fork(forgetPasswordSaga)
  ])
}
