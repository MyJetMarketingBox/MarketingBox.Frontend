import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { ForgetPwdTypes } from "./actionTypes";
import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userResetPasswordSuccess,
  userResetPasswordError,
} from "./actions";

//Include Both Helper File with needed methods
//import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
  sendNewPassword,
  sendResetPassword,
} from "../../../helpers/backend_helper";
import { AxiosError } from "axios";

//const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload }: any) {
  try {
    const response: Promise<any> = yield call(sendResetPassword, payload);
    yield put(
      userForgetPasswordSuccess(
        "Reset link are sended to your mailbox, check there first"
      )
    );
  } catch (error) {
    yield put(userForgetPasswordError("Somthing went wrong"));
  }
}

function* sendNewResetPasswordSaga({ payload }: any) {
  try {
    const response: Promise<any> = yield call(sendNewPassword, payload);
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
