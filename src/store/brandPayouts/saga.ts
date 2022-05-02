import { call, put, takeEvery } from "redux-saga/effects"

import {BrandPayoutsType} from "./actionTypes";

import {
  getBrandPayoutsSuccess,
  getBrandPayoutsFail,
  addBPayoutFail,
  addBPayoutSuccess
} from "./actions";

import { getBrandPayouts, addBrandPayout} from "../../helpers/backend_helper";
import { updateBrand } from "../brands/profile/actions";

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
    yield  put(addBPayoutSuccess(response))

    const {id, payouts, integration, integrationType, name, link, linkParameters} = brand;
    const brandPayoutIds = payouts.map((item : any) => item.id)
    // @ts-ignore
    brandPayoutIds.push(response.id)

    const upBrand = {
      name,
      brandPayoutIds: brandPayoutIds,
      integrationId: integration.id,
      integrationType,
      link,
      linkParameters
    }

    yield put(updateBrand(upBrand, id));

  }catch(error){
    yield put(addBPayoutFail(error))
  }
}

function* addPayoutSaga({payload: payouts} : any){
  try{
    const response : Promise<any> = yield call(addBrandPayout, payouts)
    yield  put(addBPayoutSuccess(response))
  }catch(error){
    yield put(addBPayoutFail(error))
  }
}

function* brandPayoutsSaga() {
  yield takeEvery(BrandPayoutsType.GET_BRAND_PAYOUTS, getBrandPayoutsSaga)
  yield takeEvery(BrandPayoutsType.ADD_PAYOUT, addPayoutSaga)
  yield takeEvery(BrandPayoutsType.ADD_BRAND_PAYOUT, addBrandPayoutSaga)
}

export default brandPayoutsSaga