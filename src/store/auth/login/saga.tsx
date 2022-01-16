import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LoginTypes } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

import { postLogin, } from "../../../helpers/backend_helper";
import parseJwt from "../../../common/utils/parse";


function* loginUser({ payload: { user, history } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response: Promise<any> = yield call(postLogin, {
        email: user.email,
        password: user.password,
      });
      //console.log(response);
      //debugger
      localStorage.setItem("authUser", JSON.stringify(response));
      const userInfo = parseJwt(JSON.stringify(response))
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
    localStorage.removeItem("authUser");
    //history.push("/login");
    location.replace('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LoginTypes.LOGIN_USER, loginUser);
  yield takeEvery(LoginTypes.LOGOUT_USER, logoutUser);
}

export default authSaga;
