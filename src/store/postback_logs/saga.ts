import { call, put, takeEvery } from "redux-saga/effects"

import {PostbackLogsTypes} from "./actionTypes";

import {getPostbackLogsSuccess, getPostbackLogsFail} from "./actions";

import { getPostbackLogs} from "../../helpers/backend_helper";

function* fetchPostbackLogs({ nextUrl, filter } : any) {

  try{
    const response : Promise<any> = yield call(getPostbackLogs, nextUrl, filter)
    yield put(getPostbackLogsSuccess(response))
  }catch (error) {
    yield put(getPostbackLogsFail(error))
  }
}

function* postbackLogsSaga() {
  yield takeEvery(PostbackLogsTypes.GET_POSTBACK_LOGS, fetchPostbackLogs)
}

export default postbackLogsSaga;