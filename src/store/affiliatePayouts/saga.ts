import { call, put, takeEvery } from "redux-saga/effects"

import {AffPayoutsTypes} from "./actionTypes";

import {
  getAffPayoutsSuccess,
  getAffPayoutsFail,
  addAffPayoutsSuccess,
  addAffPayoutsFail,
  addPayoutSuccess,
  addPayoutFail,
  updatePayoutFail,
  updatePayoutSuccess,
  delPayoutSuccess,
  delPayoutFail
} from "./actions";

import { updateAffiliate } from "../affiliates/profile/actions";

import {
  getAffPayouts,
  addAffPayouts,
  updateAffPayout,
  delAffPayouts
} from "../../helpers/backend_helper";


function* getAffPayoutsSaga({nextUrl, filter} : any) {
  try{
    const response : Promise<any> = yield call(getAffPayouts, nextUrl, filter);
    yield put(getAffPayoutsSuccess(response));
  }catch (error) {
    yield put(getAffPayoutsFail(error));
  }
}

function* addAffPayoutsSaga({affPayouts, affiliate} : any) {
  try{
    const response : Promise<any> = yield call(addAffPayouts, affPayouts);
    yield put(addAffPayoutsSuccess(response))

    const {id, payouts, generalInfo} = affiliate;
    const affiliatePayoutIds = payouts.map((item : any) => item.id)

    // @ts-ignore
    affiliatePayoutIds.push(response.id)

    const upAffiliate = {
      generalInfo,
      affiliatePayoutIds: affiliatePayoutIds
    }
    yield put(updateAffiliate(upAffiliate, id))

  }catch (error) {
    yield put(addAffPayoutsFail(error));
  }
}

function* addPayoutSaga({payload: payouts} : any) {
  try{
    const response : Promise<any> = yield call(addAffPayouts, payouts);
    yield put(addPayoutSuccess(response))
  }catch (error) {
    yield put(addPayoutFail(error));
  }
}

function* updatePayoutSaga({data, id} : any) {
  try{
    const response : Promise<any> = yield call(updateAffPayout, data, id);
    yield put(updatePayoutSuccess(response));
  }catch (error) {
    yield put(updatePayoutFail(error))
  }
}

function* delAffPayoutsSaga({payload : id} : any) {
  try{
    yield call(delAffPayouts, id);
    yield put(delPayoutSuccess(id));
  }catch (error) {
    yield put(delPayoutFail(error))
  }
}


function* affPayoutsSaga() {
  yield takeEvery(AffPayoutsTypes.GET_AFF_PAYOUTS, getAffPayoutsSaga);
  yield takeEvery(AffPayoutsTypes.ADD_AFF_PAYOUTS, addAffPayoutsSaga)
  yield takeEvery(AffPayoutsTypes.ADD_PAYOUT, addPayoutSaga)
  yield takeEvery(AffPayoutsTypes.UPDATE_PAYOUT, updatePayoutSaga)
  yield takeEvery(AffPayoutsTypes.DELETE_PAYOUT, delAffPayoutsSaga)
}

export default affPayoutsSaga;