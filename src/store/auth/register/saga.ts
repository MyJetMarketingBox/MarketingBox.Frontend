import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { RegisterTypes } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

import {
  postRegister
} from "../../../helpers/backend_helper"


function* registerUser({ payload: { user } } : any) {
  try {
    const response: Promise<any>  = yield call(postRegister, user)
    yield put(registerUserSuccessful({ "Status": "Ok"}))
  } catch (error) {
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(RegisterTypes.REGISTER_USER, registerUser)
}

function* registerSaga() {
  yield all([fork(watchUserRegister)])
}

export default registerSaga
