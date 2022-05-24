import { call, put, takeEvery } from "redux-saga/effects";

import { GeoTypes } from "./actionTypes";

import {
  getGeoSuccess,
  getGeoFail,
  getGeoProfileFail,
  getGeoProfileSuccess,
  updateGeoFail,
  updateGeoSuccess,
  addGeoFail,
  addGeoSuccess,
  delGeoSuccess,
  delGeoFail
} from "./actions";

import { getGeo, getGeoProfile, updateGeoProfile, addGeo, delGeo } from "../../helpers/backend_helper";

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

function* updateGeoSaga({ payload: geo, id: id } : any) {
  try {
    const response: Promise<any> = yield call(updateGeoProfile, geo, id)
    yield put(updateGeoSuccess(response))
  }catch (error) {
    yield put(updateGeoFail(error))
  }
}

function* addGeoSaga({ payload: geo} : any) {
  try {
    const response: Promise<any> = yield call(addGeo, geo);
    yield put(addGeoSuccess(response))
  }catch (error) {
    yield put(addGeoFail(error))
  }
}

function* delGeoSaga({ payload: id }: any) {
  try {
    yield call(delGeo, id);
    yield put(delGeoSuccess(id));
  } catch (error) {
    yield put(delGeoFail(error));
  }
}

function* geoSaga() {
  yield takeEvery(GeoTypes.GET_GEO, getGeoSaga);
  yield takeEvery(GeoTypes.GET_GEO_PROFILE, getGeoProfileSaga);
  yield takeEvery(GeoTypes.UPDATE_GEO, updateGeoSaga);
  yield takeEvery(GeoTypes.ADD_GEO, addGeoSaga);
  yield takeEvery(GeoTypes.DEL_GEO, delGeoSaga);
}

export default geoSaga;
