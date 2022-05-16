import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { RegistrationsTypes } from "./actionTypes"

import {
  getRegistrationsSuccess,
  getRegistrationsFail
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import { getRegistrations } from "../../helpers/backend_helper";

function* fetchRegistrations({ nextUrl, filter } : any) {

  try{
    const response : Promise<any> = yield call(getRegistrations, nextUrl, filter)
    yield put(getRegistrationsSuccess(response))
  }catch (error) {
    yield put(getRegistrationsFail(error))
  }
}

function* registrationsSaga() {
  yield takeEvery(RegistrationsTypes.GET_REGISTRATIONS, fetchRegistrations)
}

export default registrationsSaga;