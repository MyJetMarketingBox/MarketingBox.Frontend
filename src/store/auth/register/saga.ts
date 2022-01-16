import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { RegisterTypes } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"


import {
  postFakeRegister
} from "../../../helpers/backend_helper"


// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } } : any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response: Promise<any>  = yield call(postFakeRegister, user)
      yield put(registerUserSuccessful(response))
    }
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
