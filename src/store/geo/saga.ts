import { call, put, takeEvery } from "redux-saga/effects";

import { GeoTypes } from "./actionTypes";

import { getGeoSuccess, getGeoFail, getGeoProfileFail, getGeoProfileSuccess } from "./actions";

import { getGeo, getGeoProfile } from "../../helpers/backend_helper";

function* getGeoSaga({ nextUrl, filter }: any) {
  try {
    const response: Promise<any> = yield call(getGeo, nextUrl, filter);
    yield put(getGeoSuccess(response));
  } catch (error) {
    yield put(getGeoFail(error));
  }
}

function* getGeoProfileSaga({id} : any) {
  try {
    const response: Promise<any> = yield call(getGeoProfile, id);
    // @ts-ignore
    yield put(getGeoProfileSuccess(response.items[0]));
  }catch (error) {
    yield put(getGeoProfileFail(error))
  }
}

function* geoSaga() {
  yield takeEvery(GeoTypes.GET_GEO, getGeoSaga);
  yield takeEvery(GeoTypes.GET_GEO_PROFILE, getGeoProfileSaga);
}

export default geoSaga;
