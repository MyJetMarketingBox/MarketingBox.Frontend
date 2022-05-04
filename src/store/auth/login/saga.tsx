import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LoginTypes } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import { postLogin } from "../../../helpers/backend_helper";
import parseJwt from "../../../common/utils/parse";
import { LOCAL_STORAGE_AUTH_USER } from "../../../constants/localStorageKeys";

function* loginUser({ payload: { user, history } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response: Promise<any> = yield call(postLogin, {
        email: user.email,
        password: user.password,
      });
      //console.log(response);
      //debugger
      localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(response));
      const userInfo = parseJwt(JSON.stringify(response));
      yield put(loginSuccess(userInfo));
    }
    history.push("/dashboard");
    //location.replace('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }: any) {
  try {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
    //history.push("/login");
    location.replace("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LoginTypes.LOGIN_USER, loginUser);
  yield takeEvery(LoginTypes.LOGOUT_USER, logoutUser);
}

export default authSaga;
