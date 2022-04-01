import {call, put, takeEvery} from "redux-saga/effects"

import {CountriesType} from "./actionTypes";

import {
  getCountriesSuccess,
  getCountriesFail
} from "./actions";

import {getCountries} from "../../helpers/backend_helper";

function* fetchCountries({ nextUrl, filter }: any) {
  try{
    const response : Promise<any> = yield call(getCountries, nextUrl, filter)
    yield put(getCountriesSuccess(response))
  }catch (error) {
    yield put(getCountriesFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(CountriesType.GET_COUNTRIES, fetchCountries);
}

export default contactsSaga;

