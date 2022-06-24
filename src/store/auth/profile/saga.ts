import { takeEvery, fork, put, all, call } from "redux-saga/effects"

import { IChangeProfilePasswordAction, ProfileTypes } from "./actionTypes";
import {
  getProfileFail,
  getProfileSuccess,
  profileChangePasswordError,
  profileChangePasswordSuccess,
  updateProfileFail,
  updateProfileSuccess
} from "./actions";

import {
  changePasswordApi,
  getAffiliateProfile, updateAffiliate
} from "../../../helpers/backend_helper";



function* getProfileSaga({ affiliateId }: any) {
  try{
    const response: Promise<any> = yield call(getAffiliateProfile, affiliateId)
    yield put(getProfileSuccess(response))
  }catch (error) {
   yield put(getProfileFail(error))
  }
}

function* updateProfileSaga({ payload: affiliate, id: id }: any) {
  try {
    const response: Promise<any> = yield call(updateAffiliate, affiliate, id);
      yield put(updateProfileSuccess(response))
  } catch (error) {
    yield put(updateProfileFail(error))
  }
}

function* profileChangePasswordSaga({ payload }: IChangeProfilePasswordAction) {
  try {
    const response: Promise<any> = yield call(changePasswordApi, payload);
    yield put(profileChangePasswordSuccess());
  } catch (error) {
    yield put(profileChangePasswordError());
  }
}

export function* ProfileSaga() {
  yield takeEvery(ProfileTypes.GET_PROFILE, getProfileSaga)
  yield takeEvery(ProfileTypes.UPDATE_PROFILE, updateProfileSaga)
  yield takeEvery(ProfileTypes.PROFILE_CHANGE_PASSWORD, profileChangePasswordSaga)
}

export default ProfileSaga
