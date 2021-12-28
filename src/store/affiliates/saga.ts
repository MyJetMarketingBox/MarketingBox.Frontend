import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { AffiliatesTypes } from "./actionTypes"

import {
  getAffiliateProfileFail,
  getAffiliateProfileSuccess,
  getAffiliatesFail,
  getAffiliatesSuccess
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import { getAffiliates, getAffiliateProfile } from "../../helpers/fakebackend_helper";

function* fetchAffiliates({ data } : any) {
  try{
    const response : Promise<any> = yield call(getAffiliates, data)
    yield put(getAffiliatesSuccess(response))
  }catch (error) {
    yield put(getAffiliatesFail(error))
  }
}

function* fetchAffiliateProfile({ affiliateId } : any) {
  try {
    const response : Promise<any> = yield call(getAffiliateProfile, affiliateId)
    yield put(getAffiliateProfileSuccess(response))
  } catch (error) {
    console.log(error);
    yield put(getAffiliateProfileFail(error))
  }
}



function* contactsSaga() {
  yield takeEvery(AffiliatesTypes.GET_AFFILIATES, fetchAffiliates)
  yield takeEvery(AffiliatesTypes.GET_AFFILIATE_PROFILE, fetchAffiliateProfile)
}

export default contactsSaga;