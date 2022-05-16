import { call, put, takeEvery } from "redux-saga/effects"

import {RedistributionTypes} from "./actionTypes";

import {
  getRedistributionSuccess,
  getRedistributionFail
} from "./actions"


import { getRedistribution } from "../../helpers/backend_helper";

function* getRedistributionSaga({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getRedistribution, nextUrl, filter)
    yield put(getRedistributionSuccess(response))
  }catch (error) {
    yield put(getRedistributionFail(error))
  }
}

function* redistributionSaga() {
  yield takeEvery(RedistributionTypes.GET_REDISTRIBUTION, getRedistributionSaga)
}

export default redistributionSaga;
