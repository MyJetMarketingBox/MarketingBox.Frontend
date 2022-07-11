import { call, put, takeEvery } from "redux-saga/effects"

import {PostbackTypes} from "./actionTypes";

import {
  getPostbacksSuccess,
  getPostbacksFail,
  addPostbackSuccess,
  addPostbackFail,
  delPostbackSuccess,
  delPostbackFail,
  updatePostbackSuccess,
  updatePostbackFail, modalPostback
} from "./actions";

import { getPostback, addPostback, delPostback, updatePostback } from "../../helpers/backend_helper";

function* getPostbacksSaga({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getPostback, nextUrl, filter)
    yield put(getPostbacksSuccess(response))
  }catch (error) {
    yield put(getPostbacksFail(error))
  }
}

function* addPostbackSaga({payload: postback} : any) {
  try{
    const response : Promise<any> = yield call(addPostback, postback);
    yield put(addPostbackSuccess(response));
    yield put(modalPostback(false));
  }catch (error) {
    yield put(addPostbackFail(error));
  }
}

function* updatePostbackSaga({payload: postback, id: id }: any) {
  try{
    const response : Promise<any> = yield call(updatePostback, postback, id);
    yield put(updatePostbackSuccess(response))
    yield put(modalPostback(false));
  }catch (error) {
    yield put(updatePostbackFail(error))
  }
}

function* delPostbackSaga({ payload: id }: any) {
  try{
    const response : Promise<any> = yield call(delPostback, id);
    yield put(delPostbackSuccess(response, id))
  }catch (error) {
    yield put(delPostbackFail(error));
  }
}

function* postbackSaga() {
  yield takeEvery(PostbackTypes.GET_POSTBACKS, getPostbacksSaga);
  yield takeEvery(PostbackTypes.ADD_POSTBACK, addPostbackSaga);
  yield takeEvery(PostbackTypes.UPDATE_POSTBACK, updatePostbackSaga);
  yield takeEvery(PostbackTypes.DEL_POSTBACK, delPostbackSaga);
}

export default postbackSaga;