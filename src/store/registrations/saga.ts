import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { RegistrationsTypes } from "./actionTypes"

import {
  getRegistrationsSuccess,
  getRegistrationsFail,
  getStatusLogFail,
  getStatusLogSuccess,
  updateRegistrationStatusFail,
  updateRegistrationStatusSuccess
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import { getRegistrations, getStatusLog, updateRegStatus } from "../../helpers/backend_helper";


function* fetchRegistrations({ nextUrl, filter } : any) {
  try{
    const response : Promise<any> = yield call(getRegistrations, nextUrl, filter)
    yield put(getRegistrationsSuccess(response))
  }catch (error) {
    yield put(getRegistrationsFail(error))
  }
}

function* fetchStatusLog({ filter }: any) {
  try{
    const response : Promise<any> = yield call(getStatusLog, filter)
    yield put(getStatusLogSuccess(response))
  }catch (error) {
    yield put(getStatusLogFail(error))
  }
}

function* updateRegStatusSaga({id, request} : any) {
  try{
    const response : Promise<any> = yield call(updateRegStatus, id, request);
    yield put(updateRegistrationStatusSuccess(response))
  }catch (error) {
    yield put(updateRegistrationStatusFail(error))
  }
}

function* registrationsSaga() {
  yield takeEvery(RegistrationsTypes.GET_REGISTRATIONS, fetchRegistrations)
  yield takeEvery(RegistrationsTypes.GET_STATUS_LOG, fetchStatusLog)
  yield takeEvery(RegistrationsTypes.UPDATE_STATUS, updateRegStatusSaga)
}

export default registrationsSaga;