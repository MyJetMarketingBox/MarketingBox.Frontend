import { takeEvery, call, put } from "redux-saga/effects";
import Page from "src/constants/pages";
import { postLogin, postRegister } from "src/helpers/backend_helper";
import {
  authApiErrorAction,
  authSetTokenAction,
  registerUserFailAction,
  registerUserSuccessAction,
  signInSuccessAction,
} from "./actions";
import {
  AuthUserActionEnum,
  AuthUserResponse,
  ILogInUserAction,
  ILogoutUserAction,
} from "./actionTypes";

function* logInUserSage({ payload }: ILogInUserAction) {
  try {
    const response: AuthUserResponse = yield call(postLogin, {
      ...payload.user,
    });

    yield put(authSetTokenAction(response.token));
    yield put(signInSuccessAction());
  } catch (error) {
    yield put(authApiErrorAction(error));
  }
}

function* registerUserSaga({ payload: { user } }: any) {
  try {
    const response: {
      token: string;
      expiresAt: string;
    } = yield call(postRegister, user);

    yield put(authSetTokenAction(response.token));
    yield put(registerUserSuccessAction());
  } catch (error) {
    yield put(registerUserFailAction(error));
  }
}

function* logoutUserSaga({ history }: ILogoutUserAction) {
  yield history.push(Page.SIGN_IN);
}

function* authUserSage() {
  yield takeEvery(AuthUserActionEnum.LOGIN, logInUserSage);
  yield takeEvery(AuthUserActionEnum.LOGOUT, logoutUserSaga);
  yield takeEvery(AuthUserActionEnum.REGISTER_USER, registerUserSaga);
}

export default authUserSage;
