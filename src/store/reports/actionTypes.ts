export enum ReportsTypes {
  /** Get reports */
  GET_REPORTS = '@@affiliates/GET_REPORTS',
  GET_REPORTS_SUCCESS = '@@affiliates/GET_REPORTS_SUCCESS',
  GET_REPORTS_FAIL = '@@affiliates/GET_REPORTS_FAIL',
}

export interface ReportsState {
  reports  : Array<any>;
  reportProfile : Object;
  error : Object;
}