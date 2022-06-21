import {DashStatisticsTypes} from './actionTypes'

export const getDashStatistics = (filter: object) => ({
  type: DashStatisticsTypes.GET_DASH_STATISTICS,
  filter
})

export const getDashStatisticsSuccess = (data: any) => ({
  type: DashStatisticsTypes.GET_DASH_STATISTICS_SUCCESS,
  payload: data
})

export const getDashStatisticsFail = (error: any) => ({
  type: DashStatisticsTypes.GET_DASH_STATISTICS_FAIL,
  payload: error
})

export const clearDashStatistics = () => ({
  type: DashStatisticsTypes.CLEAR_DASH_STATISTICS
})