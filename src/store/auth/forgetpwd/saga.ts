import { takeEvery, put, call } from "redux-saga/effects";

import { ForgetPwdTypes } from "./actionTypes";
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userResetPasswordSuccess,
  userResetPasswordError,
} from "./actions";

import {
  sendNewPassword,
  sendResetPassword,
} from "../../../helpers/backend_helper";

function* forgetUser({ payload }: any) {
  try {
    yield call(sendResetPassword, payload);
    yield put(
      userForgetPasswordSuccess(
        "Reset link are sended to your mailbox, check there first"
      )
    );
  } catch (error) {
    yield put(userForgetPasswordError("Something went wrong"));
  }
}

function* sendNewResetPasswordSaga({ payload }: any) {
  try {
    yield call(sendNewPassword, payload);
    yield put(userResetPasswordSuccess("Successfully changed password"));
  } catch (error) {
    yield put(userResetPasswordError("Token is invalid"));
  }
}

function* forgetPasswordSaga() {
  yield takeEvery(ForgetPwdTypes.FORGET_PASSWORD, forgetUser);
  yield takeEvery(ForgetPwdTypes.RESET_PASSWORD, sendNewResetPasswordSaga);
}

export default forgetPasswordSaga;
