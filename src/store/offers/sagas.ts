import { call, put, takeEvery } from "redux-saga/effects";
import { getOffersList } from "src/helpers/backend_helper";
import { getOffersSuccess } from "./actions";
import { IGetOffersAction, IOffersDTO, OffersActionEnum } from "./actionTypes";

function* getOffersSaga({ nextUrl = "", params = {} }: IGetOffersAction) {
  try {
    const response: IOffersDTO = yield call(getOffersList, nextUrl, params);
    yield put(getOffersSuccess(response));
  } catch (error) {}
}

function* offersSaga() {
  yield takeEvery(OffersActionEnum.GET_OFFERS, getOffersSaga);
}
export default offersSaga;
