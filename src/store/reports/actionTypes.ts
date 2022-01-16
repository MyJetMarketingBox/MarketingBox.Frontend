export enum ReportsTypes {
  /** Get reports */
  GET_REPORTS = '@@affiliates/GET_REPORTS',
  GET_REPORTS_SUCCESS = '@@affiliates/GET_REPORTS_SUCCESS',
  GET_REPORTS_FAIL = '@@affiliates/GET_REPORTS_FAIL',
}

interface iReports {
  items  : Array<object>;
  pagination : Object;
}

export interface ReportsState {
  reports  : iReports;
  reportProfile : Object;
  error : Object;
}