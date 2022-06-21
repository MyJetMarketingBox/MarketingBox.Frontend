import  { call, put, takeEvery } from "redux-saga/effects"

import { IntegrationsTypes} from "./actionTypes";

import {
  getIntegrationsSuccess, getIntegrationsFail,
  getIntegrationSuccess, getIntegrationFail,
  addIntegrationSuccess, addIntegrationFail,
  deleteIntegrationSuccess, deleteIntegrationFail,
  updateIntegrationSuccess, updateIntegrationFail,
} from "./actions";

import {
  getIntegrations,
  getIntegration,
  addIntegration,
  deleteIntegration,
  updateIntegration
} from "../../helpers/backend_helper";

function* fetchIntegrations({nextUrl, filter} : any) {
  try{
    const response : Promise<any> = yield call(getIntegrations, nextUrl, filter)
    yield put(getIntegrationsSuccess(response))
  }catch (error) {
    yield put(getIntegrationsFail(error));
  }
}

function* fetchIntegration({ id } : any) {
  try{
    const response : Promise<any> = yield call(getIntegration, id)
    yield put(getIntegrationSuccess(response))
  }catch (error) {
    yield put(getIntegrationFail(error))
  }
}

function* addIntegrationSaga({payload: integration} : any) {
  try{
    const response : Promise<any> = yield call(addIntegration, integration)
    yield put(addIntegrationSuccess(response))
  }catch (error) {
    yield put(addIntegrationFail(error))
  }
}

function* updateIntegrationSaga({payload: integration, id: id}: any) {
  try{
    const response : Promise<any> = yield call(updateIntegration, integration, id);
    yield put(updateIntegrationSuccess(response));
  }catch (error) {
    yield put(updateIntegrationFail(error));
  }
}

function* deleteIntegrationSaga({ payload: id } : any) {
  try {
    yield call(deleteIntegration, id)
    yield put(deleteIntegrationSuccess(id))
  }catch (error) {
    yield put(deleteIntegrationFail(error))
  }
}

function* integrationsSaga() {
  yield takeEvery(IntegrationsTypes.GET_INTEGRATIONS, fetchIntegrations)
  yield takeEvery(IntegrationsTypes.GET_INTEGRATION, fetchIntegration)
  yield takeEvery(IntegrationsTypes.ADD_INTEGRATION, addIntegrationSaga)
  yield takeEvery(IntegrationsTypes.DELETE_INTEGRATION, deleteIntegrationSaga)
  yield takeEvery(IntegrationsTypes.UPDATE_INTEGRATION, updateIntegrationSaga)

}

export default integrationsSaga;