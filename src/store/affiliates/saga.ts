import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { AffiliatesTypes } from "./actionTypes"

import {
  getAffiliatesFail,
  getAffiliatesSuccess,
  addAffiliateFail,
  addAffiliateSuccess,
  deleteAffiliateFail,
  deleteAffiliateSuccess,
  updateAffiliateSuccess,
  updateAffiliateFail
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import {
  getAffiliates,
  getAffiliateProfile,
  addNewAffiliate,
  deleteAffiliate,
  updateAffiliate
} from "../../helpers/backend_helper";

function* fetchAffiliates({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getAffiliates, nextUrl, filter)
    yield put(getAffiliatesSuccess(response))
  }catch (error) {
    yield put(getAffiliatesFail(error))
  }
}

function* onAddNewAffiliate({ payload: affiliate } : any) {
  try {
    const response : Promise<any> = yield call(addNewAffiliate, affiliate)
    yield put(addAffiliateSuccess(response))
  } catch (error) {
    yield put(addAffiliateFail(error))
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
  yield takeEvery(AffiliatesTypes.ADD_NEW_AFFILIATE, onAddNewAffiliate)
  yield takeEvery(AffiliatesTypes.UPDATE_AFFILIATE, onUpdateAffiliate)
  yield takeEvery(AffiliatesTypes.DELETE_AFFILIATE, onDeleteAffiliate)
}

export default contactsSaga;
