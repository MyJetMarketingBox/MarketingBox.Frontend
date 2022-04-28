import {call, put, takeEvery} from "redux-saga/effects";

import {AffProfileTypes} from "./actionTypes";

import {
  getAffiliateProfileFail,
  getAffiliateProfileSuccess,
  updateAffiliateSuccess,
  updateAffiliateFail
} from './actions';

import { getAffiliateProfile, updateAffiliate } from "../../../helpers/backend_helper";


function* fetchAffiliateProfile({ affiliateId } : any) {
  try {
    const response : Promise<any> = yield call(getAffiliateProfile, affiliateId)
    yield put(getAffiliateProfileSuccess(response))
  } catch (error) {
    yield put(getAffiliateProfileFail(error))
  }
}

function* onUpdateAffiliate({ payload: affiliate, id: id } : any) {
  try {
    const response : Promise<any> = yield call(updateAffiliate, affiliate, id)
    yield put(updateAffiliateSuccess(response))
  } catch (error) {
    yield put(updateAffiliateFail(error))
  }
}

function* affProfileSaga() {
  yield takeEvery(AffProfileTypes.GET_AFFILIATE_PROFILE, fetchAffiliateProfile)
  yield takeEvery(AffProfileTypes.UPDATE_AFFILIATE, onUpdateAffiliate)
}

export default affProfileSaga