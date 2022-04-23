import {call, put, takeEvery} from "redux-saga/effects";

import {AffProfileTypes} from "./actionTypes";

import {
  getAffiliateProfileFail,
  getAffiliateProfileSuccess,
} from './actions';

import { getAffiliateProfile } from "../../../helpers/backend_helper";

function* fetchAffiliateProfile({ affiliateId } : any) {
  try {
    const response : Promise<any> = yield call(getAffiliateProfile, affiliateId)
    yield put(getAffiliateProfileSuccess(response))
  } catch (error) {
    yield put(getAffiliateProfileFail(error))
  }
}

function* affProfileSaga() {
  yield takeEvery(AffProfileTypes.GET_AFFILIATE_PROFILE, fetchAffiliateProfile)
}

export default affProfileSaga