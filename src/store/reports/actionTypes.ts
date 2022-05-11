export enum ReportsTypes {
  /** Get reports */
  GET_REPORTS = '@@reports/GET_REPORTS',
  GET_REPORTS_SUCCESS = '@@reports/GET_REPORTS_SUCCESS',
  GET_REPORTS_FAIL = '@@reports/GET_REPORTS_FAIL',

  CLEAR_REPORTS = '@@reports/CLEAR_REPORTS'
}

interface iReports {
  items  : Array<object>;
  pagination : Object;
}

export interface ReportsState {
  reports  : iReports;
  reportProfile : Object;
  error : Object;
  loading: boolean;
  loaded: boolean;
}