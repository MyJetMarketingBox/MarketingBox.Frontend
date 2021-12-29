import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { ReportsTypes } from "./actionTypes"

import {
  getReportsSuccess,
  getReportsFail
} from "./actions";

//Включите оба файла-помощника с необходимыми методами
import { getReports } from "../../helpers/fakebackend_helper";

function* fetchReports({ data } : any) {
  try{
    console.log(data);
    if(data){

    }
    debugger
    const response : Promise<any> = yield call(getReports, data)
    yield put(getReportsSuccess(response))
  }catch (error) {
    yield put(getReportsFail(error))
  }
}


function* contactsSaga() {
  yield takeEvery(ReportsTypes.GET_REPORTS, fetchReports)
}

export default contactsSaga;