import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCampaignsApi,
  addCampaignApi,
  updateCampaignApi,
  deleteCampaignApi,
} from "../../helpers/backend_helper";

// Crypto Redux States
import { CampaignsTypes } from "./actionTypes";
import {
  addCampaignFail,
  addCampaignSuccess,
  deleteCampaignFail,
  deleteCampaignSuccess,
  editCampaign,
  editCampaignSuccess,
  getCampaignsFail,
  getCampaignsSuccess,
} from "./actions";

function* getCampaigns({ nextUrl, filter }: any) {
  try {
    const response: Promise<any> = yield call(getCampaignsApi, nextUrl, filter);
    yield put(getCampaignsSuccess(response));
  } catch (error) {
    yield put(getCampaignsFail(error));
  }
}

function* addCampaign({ payload: campaign }: any) {
  try {
    const response: Promise<any> = yield call(addCampaignApi, campaign);
    yield put(addCampaignSuccess(response));
  } catch (error) {
    yield put(addCampaignFail(error));
  }
}

function* editCampaignSaga({ payload: campaign }: any) {
  try {
    const response: Promise<any> = yield call(
      updateCampaignApi,
      campaign,
      campaign.id
    );
    yield put(editCampaignSuccess(response));
  } catch (error) {
    yield put(addCampaignFail(error));
  }
}

function* deleteCampaign({ payload: id }: any) {
  try {
    yield call(deleteCampaignApi, id);
    yield put(deleteCampaignSuccess(id));
  } catch (error) {
    yield put(deleteCampaignFail(error));
  }
}

function* campaignsSaga() {
  yield takeEvery(CampaignsTypes.GET_CAMPAIGNS, getCampaigns);
  yield takeEvery(CampaignsTypes.ADD_CAMPAIGN, addCampaign);
  yield takeEvery(CampaignsTypes.DELETE_CAMPAIGN, deleteCampaign);
  yield takeEvery(CampaignsTypes.EDIT_CAMPAIGN, editCampaignSaga);
}

export default campaignsSaga;
