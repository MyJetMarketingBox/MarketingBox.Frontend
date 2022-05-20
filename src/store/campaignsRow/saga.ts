import {
  CampaignRowsActionEnum,
  ICampaignRowDTO,
  IDeleteCampaignRowAction,
  IGetCampaignRowAction,
} from "./actionTypes";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  deleteCampaignRowsApi,
  getCampaignRowsApi,
} from "src/helpers/backend_helper";
import { deleteCampaignRowSuccess, getCampaignRowsSuccess } from "./actions";

function* getCampaignRowByCampaignIdSaga({
  nextUrl,
  params,
}: IGetCampaignRowAction) {
  try {
    const response: ICampaignRowDTO = yield call(
      getCampaignRowsApi,
      nextUrl,
      params
    );
    yield put(getCampaignRowsSuccess(response));
  } catch (error) {}
}

function* deleteCampaignRowSage({ id }: IDeleteCampaignRowAction) {
  try {
    yield call(deleteCampaignRowsApi, id);
    yield put(deleteCampaignRowSuccess(id));
  } catch (error) {
    
  }
}

function* campaignRowsSaga() {
  yield takeEvery(
    CampaignRowsActionEnum.GET_CAMPAIGN_ROW,
    getCampaignRowByCampaignIdSaga
  );

  yield takeEvery(
    CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW,
    deleteCampaignRowSage
  );
}

export default campaignRowsSaga;
