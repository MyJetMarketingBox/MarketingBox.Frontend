import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { AffiliatesTypes } from "./actionTypes"

import {
  getAffiliateProfileFail,
  getAffiliateProfileSuccess,
  getAffiliatesFail,
  getAffiliatesSuccess,
  addAffiliateFail,
  addAffiliateSuccess,
  deleteAffiliateFail,
  deleteAffiliateSuccess, addAffiliateStart
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import {
  getAffiliates,
  getAffiliateProfile,
  addNewAffiliate,
  deleteAffiliate } from "../../helpers/backend_helper";

function* fetchAffiliates({ nextUrl, filter } : any) {

  try{
    const response : Promise<any> = yield call(getAffiliates, nextUrl, filter)
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

function* onAddNewAffiliate({ payload: affiliate } : any) {
  yield put(addAffiliateStart())
  try {
    const response : Promise<any> = yield call(addNewAffiliate, affiliate)
    yield put(addAffiliateSuccess(response))
  } catch (error) {
    yield put(addAffiliateFail(error))
  }
}

function* onDeleteAffiliate({ payload: id } : any) {
  try {
    yield call(deleteAffiliate, id)
    yield put(deleteAffiliateSuccess(id))
  } catch (error) {
    yield put(deleteAffiliateFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(AffiliatesTypes.GET_AFFILIATES, fetchAffiliates)
  yield takeEvery(AffiliatesTypes.GET_AFFILIATE_PROFILE, fetchAffiliateProfile)
  yield takeEvery(AffiliatesTypes.ADD_NEW_AFFILIATE, onAddNewAffiliate)
  yield takeEvery(AffiliatesTypes.DELETE_AFFILIATE, onDeleteAffiliate)
}

export default contactsSaga;