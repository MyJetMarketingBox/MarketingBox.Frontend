import { call, put, takeEvery } from "redux-saga/effects"

import {BrandPayoutsType} from "./actionTypes";

import {
  getBrandPayoutsSuccess,
  getBrandPayoutsFail
} from "./actions";

import { getBrandPayouts } from "../../helpers/backend_helper"

function* getBrandPayoutsSaga({nextUrl, filter} : any) {
  try{
    const response : Promise<any> = yield call(getBrandPayouts, nextUrl, filter);
    yield put(getBrandPayoutsSuccess(response))
  }catch (error) {
    yield put(getBrandPayoutsFail(error));
  }
}

function* brandPayoutsSaga() {
  yield takeEvery(BrandPayoutsType.GET_BRAND_PAYOUTS, getBrandPayoutsSaga)
}

export default brandPayoutsSaga