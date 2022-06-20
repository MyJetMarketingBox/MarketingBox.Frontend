import { all, fork } from "redux-saga/effects";

//Layout
import LayoutSaga from "./layout/saga";

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
import integrationsSaga from "./integrations/saga";

//Registrations
import registrationsSaga from "./registrations/saga";

//RegFiles
import regFilesSaga from "./regFiles/saga";

//PostbackLogs
import postbackLogsSaga from "./postback_logs/saga";

//Postback
import postbackSaga from "./postback/saga";

//Geo
import geoSaga from "./geo/saga";

//Redistribution
import redistributionSaga from "./redistribution/saga";

//User Profile
import ProfileSaga from "./auth/profile/saga";

// Forget Password
import forgetPasswordSaga from "./auth/forgetpwd/saga";

//
import languageSaga from "./languages/saga";
import campaignRowsSaga from "./campaignsRow/saga";
import offersSaga from "./offers/sagas";
import authUserSage from "./authUser/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
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
    fork(postbackSaga),
    fork(redistributionSaga),
    fork(campaignRowsSaga),
    fork(offersSaga),
    fork(regFilesSaga),
    //fork(ProfileSaga),
    fork(forgetPasswordSaga),
    fork(authUserSage),
  ]);
}
