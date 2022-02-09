import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { CampaignsTypes } from "./actionTypes"
import {
  addCampaignFail,
  addCampaignSuccess, deleteCampaignFail,
  deleteCampaignSuccess,
  getCampaignsFail,
  getCampaignsSuccess
} from "./actions";

function* fetchCampaigns({ filter } : any) {
  try{
    const response = {}
    // const response : Promise<any> = yield call(getCampaigns, filter)
    yield put(getCampaignsSuccess(response))
  }catch (error) {
    yield put(getCampaignsFail(error))
  }
}

function* addCampaign({ payload: campaign } : any) {
  try {
    const response = {};
    // const response : Promise<any> = yield call(addNewAffiliate, affiliate)
    yield put(addCampaignSuccess(response))
  } catch (error) {
    yield put(addCampaignFail(error))
  }
}

function* deleteCampaign({ payload: id } : any) {
  try {
    yield put(deleteCampaignSuccess(id))
  } catch (error) {
    yield put(deleteCampaignFail(error))
  }
}

function* campaignsSaga() {
  yield takeEvery(CampaignsTypes.GET_CAMPAIGNS, fetchCampaigns);
  yield takeEvery(CampaignsTypes.ADD_CAMPAIGN, addCampaign);
  yield takeEvery(CampaignsTypes.DELETE_CAMPAIGN, deleteCampaign);
}

export default campaignsSaga;
