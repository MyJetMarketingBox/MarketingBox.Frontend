import { call, put, takeEvery } from "redux-saga/effects";
import {
  deleteOfferItem,
  getOfferItem,
  getOfferItemUrl,
  getOffersList,
} from "src/helpers/backend_helper";
import {
  deleteOfferSuccess,
  getOffersSuccess,
  getOfferSuccess,
  getOfferUrl,
  getOfferUrlSuccess,
} from "./actions";
import {
  IGetOffersAction,
  IGetOfferAction,
  IOffersDTO,
  OffersActionEnum,
  IOffersItem,
  IGetOfferUrlAction,
  IRemoveOfferAction,
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

function* getOfferUrlSaga({ payload }: IGetOfferUrlAction) {
  try {
    const response: { url: string } = yield call(getOfferItemUrl, payload);
    yield put(getOfferUrlSuccess(response));
  } catch (error) {}
}

function* deleteOfferSaga({ payload }: IRemoveOfferAction) {
  try {
    yield call(deleteOfferItem, payload);
    yield put(deleteOfferSuccess(payload));
  } catch (error) {}
}

function* offersSaga() {
  yield takeEvery(OffersActionEnum.GET_OFFERS, getOffersSaga);
  yield takeEvery(OffersActionEnum.GET_OFFER, getOfferSaga);
  yield takeEvery(OffersActionEnum.GET_OFFER_URL, getOfferUrlSaga);
  yield takeEvery(OffersActionEnum.DELETE_OFFER, deleteOfferSaga);
}
export default offersSaga;
