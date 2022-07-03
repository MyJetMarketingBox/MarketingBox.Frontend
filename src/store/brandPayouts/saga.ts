import { call, put, takeEvery } from "redux-saga/effects"

import {BrandPayoutsType} from "./actionTypes";

import {
  getBrandPayoutsSuccess,
  getBrandPayoutsFail,
  addBPayoutFail,
  addBPayoutSuccess,
  addBrandPayoutSuccess,
  addBrandPayoutFail,
  delBrandPayoutFail,
  delBrandPayoutSuccess,
  updateBrandPayoutFail,
  updateBrandPayoutSuccess
} from "./actions";

import { getBrandPayouts, addBrandPayout, delBrandPayout, updateBrandPayout} from "../../helpers/backend_helper";
import { modalAssignPayoutBrand, modalNewPayoutBrand, updateBrand } from "../brands/profile/actions";

function* getBrandPayoutsSaga({nextUrl, filter} : any) {
  try{
    const response : Promise<any> = yield call(getBrandPayouts, nextUrl, filter);
    yield put(getBrandPayoutsSuccess(response))
  }catch (error) {
    yield put(getBrandPayoutsFail(error));
  }
}

function* addBrandPayoutSaga({brandPayout, brand} : any){
  try{
    const response : Promise<any> = yield call(addBrandPayout, brandPayout)
    yield put(addBrandPayoutSuccess(response))

    const {id, payouts, integration, integrationType, name, link, linkParameters} = brand;
    const brandPayoutIds = payouts.map((item : any) => item.id)
    // @ts-ignore
    brandPayoutIds.push(response.id)

    const upBrand = {
      name,
      brandPayoutIds: brandPayoutIds,
      integrationId: integration?.id || null,
      integrationType,
      link,
      linkParameters
    }

    yield put(updateBrand(upBrand, id));

  }catch(error){
    yield put(addBrandPayoutFail(error))
  }
}

function* addPayoutSaga({payload: payouts} : any){
  try{
    const response : Promise<any> = yield call(addBrandPayout, payouts)
    yield put(addBPayoutSuccess(response));
    yield put(modalNewPayoutBrand(false));
  }catch(error){
    yield put(addBPayoutFail(error))
  }
}

function* updatePayoutSaga({data, id} : any) {
  try{
    const response : Promise<any> = yield call(updateBrandPayout, data, id)
    yield put(updateBrandPayoutSuccess(response));
    //yield put(modalAssignPayoutBrand(false));
    yield put(modalNewPayoutBrand(false));
  }catch (error) {
    yield put(updateBrandPayoutFail(error))
  }
}

function* delPayoutSaga({payload: id} : any) {
  try{
    yield call(delBrandPayout, id)
    yield put(delBrandPayoutSuccess(id))
  }catch (error) {
    yield put(delBrandPayoutFail(error))
  }
}

function* brandPayoutsSaga() {
  yield takeEvery(BrandPayoutsType.GET_BRAND_PAYOUTS, getBrandPayoutsSaga)
  yield takeEvery(BrandPayoutsType.ADD_PAYOUT, addPayoutSaga)
  yield takeEvery(BrandPayoutsType.ADD_BRAND_PAYOUT, addBrandPayoutSaga)
  yield takeEvery(BrandPayoutsType.DEL_PAYOUT, delPayoutSaga)
  yield takeEvery(BrandPayoutsType.UPDATE_PAYOUT, updatePayoutSaga)
}

export default brandPayoutsSaga