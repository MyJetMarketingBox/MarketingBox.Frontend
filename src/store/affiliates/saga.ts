import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { AffiliatesTypes } from "./actionTypes"

import {getAffiliatesFail, getAffiliatesSuccess} from './actions'

//Включите оба файла-помощника с необходимыми методами
import { getAffiliates } from "../../helpers/fakebackend_helper";

function* fetchAffiliates() {
  try{
    const response : Promise<any> = yield call(getAffiliates)
    yield put(getAffiliatesSuccess(response))
  }catch (e) {
    yield put(getAffiliatesFail(e))
  }
}


function* contactsSaga() {
  yield takeEvery(AffiliatesTypes.GET_AFFILIATES, fetchAffiliates)
}

export default contactsSaga;