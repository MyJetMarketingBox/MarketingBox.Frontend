import { call, put, takeEvery } from "redux-saga/effects";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();
//import { push } from 'react-router-redux';

import { BrandsTypes } from "./actionTypes";

import {
  getBrandsSuccess,
  getBrandsFail,
  addBrandSuccess,
  addBrandFail,
  delBrandSuccess,
  delBrandFail,
} from "./actions";

import { getBrands, addBrand, delBrand } from "../../helpers/backend_helper";
import Page from "src/constants/pages";

function* fetchBrands({ nextUrl, filter }: any) {
  try {
    const response: Promise<any> = yield call(getBrands, nextUrl, filter);
    yield put(getBrandsSuccess(response));
  } catch (e) {
    yield put(getBrandsFail(e));
  }
}

function* addBrandSaga({ payload: brand, history }: any) {
  try {
    const response: Promise<{ id: number }> = yield call(addBrand, brand);
    yield put(addBrandSuccess(response));

    response.then(res => {
      history.push(`${Page.BRANDS}/${res.id}`);
    });
  } catch (error) {
    yield put(addBrandFail(error));
  }
}

function* delBrandSaga({ payload: id }: any) {
  try {
    yield call(delBrand, id);
    yield put(delBrandSuccess(id));
  } catch (error) {
    yield put(delBrandFail(error));
  }
}

function* brandsSaga() {
  yield takeEvery(BrandsTypes.GET_BRANDS, fetchBrands);
  yield takeEvery(BrandsTypes.ADD_BRAND, addBrandSaga);
  yield takeEvery(BrandsTypes.DEL_BRAND, delBrandSaga);
}

export default brandsSaga;
