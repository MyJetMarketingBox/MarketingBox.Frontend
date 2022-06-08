import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { ProfileTypes } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"


import {
  postFakeProfile,
} from "../../../helpers/backend_helper"



function* editProfile({ payload: { user } } : any) {
  try {
      const response: Promise<any> = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(ProfileTypes.EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
