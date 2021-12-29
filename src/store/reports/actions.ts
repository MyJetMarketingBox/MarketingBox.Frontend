import {ReportsTypes} from './actionTypes'

export const getReports = (data: any) => ({
  type: ReportsTypes.GET_REPORTS,
  data
})

export const getReportsSuccess = (reports : any) => ({
  type: ReportsTypes.GET_REPORTS_SUCCESS,
  payload: reports,
})

export const getReportsFail = (error : any) => ({
  type: ReportsTypes.GET_REPORTS_FAIL,
  payload: error,
})