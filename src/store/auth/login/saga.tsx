import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LoginTypes } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";


import { postFakeLogin, } from "../../../helpers/fakebackend_helper";

//const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }: any) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response: Promise<any> = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      //console.log(response);
      //debugger
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }: any) {
  try {
    localStorage.removeItem("authUser");

    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response: Promise<any> = yield call(fireBaseBackend.logout);
    //   yield put(logoutUserSuccess(response));
    // }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

// function* socialLogin({ payload: { data, history, type } }: any) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend();
//       const response: Promise<any> = yield call(
//         fireBaseBackend.socialLoginUser,
//         data,
//         type
//       );
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else {
//       const response: Promise<any> = yield call(postSocialLogin, data);
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard");
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* authSaga() {
  yield takeEvery(LoginTypes.LOGIN_USER, loginUser);
  yield takeEvery(LoginTypes.LOGOUT_USER, logoutUser);
  //yield takeLatest(LoginTypes.SOCIAL_LOGIN, socialLogin);
}

export default authSaga;
