import {call, put, takeEvery} from "redux-saga/effects"

import {DashStatisticsTypes} from "./actionTypes";

import {getDashStatisticsSuccess, getDashStatisticsFail} from "./actions";
import { getDashStatistics } from "../../../helpers/backend_helper";

function* getDashStatisticsSaga({filter} : any) {
  try{
    const response : Promise<any> = yield call(getDashStatistics, filter);
    yield put(getDashStatisticsSuccess(response))
  }catch (error) {
    yield put(getDashStatisticsFail(error))
  }
}

function* dashStatisticsSaga() {
  yield takeEvery(DashStatisticsTypes.GET_DASH_STATISTICS, getDashStatisticsSaga)
}

export default dashStatisticsSaga;