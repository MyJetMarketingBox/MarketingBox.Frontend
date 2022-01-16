import {ReportsTypes} from './actionTypes'

export const getReports = (filter: any) => ({
  type: ReportsTypes.GET_REPORTS,
  filter
})

export const getReportsSuccess = (reports : any) => ({
  type: ReportsTypes.GET_REPORTS_SUCCESS,
  payload: reports,
})

export const getReportsFail = (error : any) => ({
  type: ReportsTypes.GET_REPORTS_FAIL,
  payload: error,
})