import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { ReportsTypes } from "./actionTypes"

import {
  getReportsSuccess,
  getReportsFail
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import { getReports } from "../../helpers/backend_helper";

function* fetchReports({ filter } : any) {
  try{
    const response : Promise<any> = yield call(getReports, filter)
    yield put(getReportsSuccess(response))
  }catch (error) {
    yield put(getReportsFail(error))
  }
}


function* contactsSaga() {
  yield takeEvery(ReportsTypes.GET_REPORTS, fetchReports)
}

export default contactsSaga;