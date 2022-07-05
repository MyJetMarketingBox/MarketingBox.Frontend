import {
  CampaignRowsActionEnum,
  IAddCampaignRowAction,
  ICampaignRowDTO,
  ICampaignRowItem,
  IDeleteCampaignRowAction,
  IEditCampaignRowAction,
  IGetCampaignRowAction,
  IEditCampaignRowEnableTraffic
} from "./actionTypes";
import { call, takeEvery, put } from "redux-saga/effects";
import {
  addCampaignRowsApi,
  deleteCampaignRowsApi,
  editCampaignRowsApi, editCampaignRowsEnableTrafficApi,
  getCampaignRowsApi
} from "src/helpers/backend_helper";
import {
  addCampaignRowSuccess,
  deleteCampaignRowSuccess, editCampaignRowEnableTrafficSuccess,
  editCampaignRowSuccess,
  getCampaignRowsSuccess
} from "./actions";

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
  } catch (error) {}
}

function* addCampaignRowSaga({ payload }: IAddCampaignRowAction) {
  try {
    const response: ICampaignRowItem = yield call(addCampaignRowsApi, payload);
    yield put(addCampaignRowSuccess(response));
  } catch (error) {}
}

function* editCampaignRowSaga({ payload }: IEditCampaignRowAction) {
  try {
    const response: ICampaignRowItem = yield call(
      editCampaignRowsApi,
      payload.id,
      payload.data
    );
    yield put(editCampaignRowSuccess(response));
  } catch (error) {}
}

function* editCampaignRowEnableTrafficSaga({ id, status } : IEditCampaignRowEnableTraffic) {
  try {
    const response: ICampaignRowItem = yield call(editCampaignRowsEnableTrafficApi, id, status);
    yield put(editCampaignRowEnableTrafficSuccess(response))
  }catch (error) {}
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

  yield takeEvery(CampaignRowsActionEnum.ADD_CAMPAIGN_ROW, addCampaignRowSaga);

  yield takeEvery(
    CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW,
    editCampaignRowSaga
  );

  yield takeEvery(
    CampaignRowsActionEnum.CAMPAIGN_ROW_ENABLE_TRAFFIC,
    editCampaignRowEnableTrafficSaga
  )
}

export default campaignRowsSaga;
