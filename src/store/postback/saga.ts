import { call, put, takeEvery } from "redux-saga/effects"

import {PostbackTypes} from "./actionTypes";

import {
  getPostbackSuccess,
  getPostbackFail
} from "./actions";

import { getPostback } from "../../helpers/backend_helper";

function* fetchPostback({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getPostback)
    yield put(getPostbackSuccess(response))
  }catch (error) {
    yield put(getPostbackFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(PostbackTypes.GET_POSTBACK, fetchPostback)
}

export default contactsSaga;