import {call, put, takeEvery} from "redux-saga/effects";
import {BrandProfileTypes} from "./actionTypes";

import {
  getBrandSuccess,
  getBrandFail,
  updateBrandSuccess,
  updateBrandFail,
  modalAssignPayoutBrand,
  modalNewPayoutBrand,
} from "./actions";

import {getBrand, updateBrand} from "../../../helpers/backend_helper";

function* getBrandSaga({id} : any) {
  try{
    const response : Promise<any> = yield call(getBrand, id)
    yield put(getBrandSuccess(response));
  }catch (error) {
    yield put(getBrandFail(error));
  }
}

function* updateBrandSaga({payload: brand, id: id}: any) {
  try{
    const response : Promise<any> = yield call(updateBrand, brand, id)
    yield put(updateBrandSuccess(response))
    yield put(modalAssignPayoutBrand(false));
    yield put(modalNewPayoutBrand(false));
  }catch (error) {
    yield put(updateBrandFail(error))
  }
}

function* brandSaga() {
  yield takeEvery(BrandProfileTypes.GET_BRAND_PROFILE, getBrandSaga)
  yield takeEvery(BrandProfileTypes.UPDATE_BRAND_PROFILE, updateBrandSaga)
}

export default brandSaga