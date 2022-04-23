import { call, put, takeEvery } from "redux-saga/effects"

import {AffPayoutsTypes} from "./actionTypes";

import {
  getAffPayoutsSuccess,
  getAffPayoutsFail,
  addAffPayoutsSuccess,
  addAffPayoutsFail,
} from "./actions";

import {
  getAffPayouts,
  addAffPayouts
} from "../../helpers/backend_helper";

function* getAffPayoutsSaga({nextUrl, filter} : any) {
  try{
    const response : Promise<any> = yield call(getAffPayouts, nextUrl, filter);
    yield put(getAffPayoutsSuccess(response));
  }catch (error) {
    yield put(getAffPayoutsFail(error));
  }
}

function* addAffPayoutsSaga({payload: affPayouts} : any) {
  try{
    const response : Promise<any> = yield call(addAffPayouts, affPayouts);
    yield put(addAffPayoutsSuccess(response))
  }catch (error) {
    yield put(addAffPayoutsFail(error));
  }
}

/*
function* delAffPayoutsSaga({payload : id} : any) {
  try{
    const response : Promise<any> = yield call();
    yield put();
  }catch (error) {
    yield put()
  }
}
*/


function* affPayoutsSaga() {
  yield takeEvery(AffPayoutsTypes.GET_AFF_PAYOUTS, getAffPayoutsSaga);
  yield takeEvery(AffPayoutsTypes.ADD_AFF_PAYOUTS, addAffPayoutsSaga)
}

export default affPayoutsSaga;