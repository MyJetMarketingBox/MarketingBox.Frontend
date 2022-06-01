import { call, put, takeEvery } from "redux-saga/effects";
import { getOfferItem, getOffersList } from "src/helpers/backend_helper";
import { getOffersSuccess, getOfferSuccess } from "./actions";
import {
  IGetOffersAction,
  IGetOfferAction,
  IOffersDTO,
  OffersActionEnum, 
  IOffersItem,
} from "./actionTypes";

function* getOffersSaga({ nextUrl = "", params = {} }: IGetOffersAction) {
  try {
    const response: IOffersDTO = yield call(getOffersList, nextUrl, params);
    yield put(getOffersSuccess(response));
  } catch (error) {}
}

function* getOfferSaga({ payload }: IGetOfferAction) {
  try {
    const response: IOffersItem = yield call(getOfferItem, payload);
    yield put(getOfferSuccess(response));
  } catch (error) {}
}

function* offersSaga() {
  yield takeEvery(OffersActionEnum.GET_OFFERS, getOffersSaga);
  yield takeEvery(OffersActionEnum.GET_OFFER, getOfferSaga);
}
export default offersSaga;
