import { call, put, takeEvery } from "redux-saga/effects"

import { GeoTypes } from "./actionTypes";

import {
  getGeoSuccess,
  getGeoFail
} from "./actions";

import {
  getGeo
} from "../../helpers/backend_helper"

function* getGeoSaga({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getGeo, nextUrl, filter)
    yield put(getGeoSuccess(response))
  }catch(error){
    yield put(getGeoFail(error))
  }
}

function* geoSaga() {
  yield takeEvery(GeoTypes.GET_GEO, getGeoSaga)
}

export default geoSaga