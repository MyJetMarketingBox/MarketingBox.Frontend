import {ReportsTypes} from './actionTypes'

export const getReports = (nextUrl: any, filter: any) => ({
  type: ReportsTypes.GET_REPORTS,
  nextUrl,
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

export const clearReports = () => ({
  type: ReportsTypes.CLEAR_REPORTS
})