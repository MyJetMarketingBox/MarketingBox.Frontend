export enum DashStatisticsTypes {
  /** GET **/
  GET_DASH_STATISTICS = "@@dashStatistics/GET_DASH_STATISTICS",
  GET_DASH_STATISTICS_SUCCESS = "@@dashStatistics/GET_DASH_STATISTICS_SUCCESS",
  GET_DASH_STATISTICS_FAIL = "@@dashStatistics/GET_DASH_STATISTICS_FAIL",

  /** CLEAR **/
  CLEAR_DASH_STATISTICS = "@@dashStatistics/CLEAR_DASH_STATISTICS"
}

interface IData{
  actual: number | 0,
  diffType: number | 0,
  percent: number | 0,
}

interface IStatistics {
  "clicks": IData,
  "registrationsCount": IData,
  "failedCount": IData,
  "ftdCount": IData,
  "cr": IData,
  "payouts": IData
}

export interface DashStatisticsState {
  statistics: IStatistics;
  loading: boolean;
  loaded: boolean;
  error: Object
}