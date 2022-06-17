import { call, put, takeEvery } from "redux-saga/effects"

import {RedistributionTypes} from "./actionTypes";

import {
  getRedistributionSuccess,
  getRedistributionFail,
  updateRedistributionStatusSuccess,
  updateRedistributionStatusFail, addRedistributionFail, addRedistributionSuccess
} from "./actions";

import { getRedistribution, updateRedStatus, addRedistribution } from "../../helpers/backend_helper";
import Page from "../../constants/pages";

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

function* addRedistributionSaga({data, history}: any) {
  try {
    const response: Promise<any> = yield call(addRedistribution, data)
    yield put(addRedistributionSuccess(response))

    yield history.push(`${Page.REDISTRIBUTION}`)
  }catch (error) {
    yield put(addRedistributionFail(error))
  }
}


function* redistributionSaga() {
  yield takeEvery(RedistributionTypes.GET_REDISTRIBUTION, getRedistributionSaga)
  yield takeEvery(RedistributionTypes.UPDATE_STATUS, updateRedStatusSaga)
  yield takeEvery(RedistributionTypes.ADD_REDISTRIBUTION, addRedistributionSaga)
}

export default redistributionSaga;
