import { call, put, takeEvery } from "redux-saga/effects"

import {BrandsTypes} from "./actionTypes";

import { getBrandsSuccess, getBrandsFail, updateBrandFail, updateBrandSuccess } from "./actions";

import {getBrands, updateBrand} from "../../helpers/backend_helper";


function* fetchBrands({nextUrl, filter} : any) {
  try{
    const response: Promise<any> = yield call(getBrands, nextUrl, filter);
    yield put(getBrandsSuccess(response));
  }catch (e) {
    yield put(getBrandsFail(e))
  }
}

function* onUpdateBrand({payload: brand, id: id} : any) {
  try{
    const response: Promise<any> = yield call(updateBrand, brand, id);
    yield put(updateBrandSuccess(response));
  }catch (error) {
    yield put(updateBrandFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(BrandsTypes.GET_BRANDS, fetchBrands)
  yield takeEvery(BrandsTypes.UPDATE_BRAND, onUpdateBrand)
}

export default contactsSaga;