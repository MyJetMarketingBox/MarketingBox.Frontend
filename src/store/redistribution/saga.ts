import { call, put, takeEvery } from "redux-saga/effects"

import {RedistributionTypes} from "./actionTypes";

import {
  getRedistributionSuccess,
  getRedistributionFail,
  updateRedistributionStatusSuccess,
  updateRedistributionStatusFail
} from "./actions";

import { getRedistribution, updateRedStatus } from "../../helpers/backend_helper";

function* getRedistributionSaga({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getRedistribution, nextUrl, filter)
    yield put(getRedistributionSuccess(response))
  }catch (error) {
    yield put(getRedistributionFail(error))
  }
}

function* updateRedStatusSaga({data} : any) {
  try{
    const response : Promise<any> = yield call(updateRedStatus, data);
    yield put(updateRedistributionStatusSuccess(response))
  }catch (error) {
    yield put(updateRedistributionStatusFail(error))
  }
}


function* redistributionSaga() {
  yield takeEvery(RedistributionTypes.GET_REDISTRIBUTION, getRedistributionSaga)
  yield takeEvery(RedistributionTypes.UPDATE_STATUS, updateRedStatusSaga)
}

export default redistributionSaga;
