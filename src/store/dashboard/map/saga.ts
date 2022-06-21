import {call, put, takeEvery} from "redux-saga/effects"

import {DashMapTypes} from "./actionTypes";

import {getDashMapSuccess, getDashMapFail} from "./actions";

import {getDashMap} from "../../../helpers/backend_helper";

function* getDashMapSaga({filter} : any) {
  try{
    const response : Promise<any> = yield call(getDashMap, filter);
    yield put(getDashMapSuccess(response))
  }catch (error) {
    yield put(getDashMapFail(error))
  }
}

function* dashMapSaga() {
  yield takeEvery(DashMapTypes.GET_DASH_MAP, getDashMapSaga)
}

export default dashMapSaga;