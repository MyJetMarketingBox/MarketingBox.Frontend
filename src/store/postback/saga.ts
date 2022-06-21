import { call, put, takeEvery } from "redux-saga/effects"

import {PostbackTypes} from "./actionTypes";

import {
  getPostbackSuccess,
  getPostbackFail,
  addPostbackSuccess,
  addPostbackFail,
  delPostbackSuccess,
  delPostbackFail,
  updatePostbackSuccess,
  updatePostbackFail
} from "./actions";

import { getPostback, addPostback, delPostback, updatePostback } from "../../helpers/backend_helper";

function* fetchPostback({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getPostback)
    yield put(getPostbackSuccess(response))
  }catch (error) {
    yield put(getPostbackFail(error))
  }
}

function* addPostbackSaga({payload: postback} : any) {
  try{
    const response : Promise<any> = yield call(addPostback, postback);
    yield put(addPostbackSuccess(response));
  }catch (error) {
    yield put(addPostbackFail(error));
  }
}

function* updatePostbackSaga({payload: postback}: any) {
  try{
    const response : Promise<any> = yield call(updatePostback, postback);
    yield put(updatePostbackSuccess(response))
  }catch (error) {
    yield put(updatePostbackFail(error))
  }
}

function* delPostbackSaga() {
  try{
    const response : Promise<any> = yield call(delPostback);
    yield put(delPostbackSuccess(response))
  }catch (error) {
    yield put(delPostbackFail(error));
  }
}

function* postbackSaga() {
  yield takeEvery(PostbackTypes.GET_POSTBACK, fetchPostback);
  yield takeEvery(PostbackTypes.ADD_POSTBACK, addPostbackSaga);
  yield takeEvery(PostbackTypes.UPDATE_POSTBACK, updatePostbackSaga);
  yield takeEvery(PostbackTypes.DEL_POSTBACK, delPostbackSaga);
}

export default postbackSaga;