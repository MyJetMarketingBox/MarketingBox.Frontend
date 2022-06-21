export enum PostbackLogsTypes {
  /** Get POSTBACK LOGS */
  GET_POSTBACK_LOGS = '@@registrations/GET_POSTBACK_LOGS',
  GET_POSTBACK_LOGS_SUCCESS = '@@registrations/GET_POSTBACK_LOGS_SUCCESS',
  GET_POSTBACK_LOGS_FAIL = '@@registrations/GET_POSTBACK_LOGS_FAIL',

  /** CLEAR POSTBACK LOGS **/
  CLEAR_POSTBACK_LOGS = '@@contact/CLEAR_POSTBACK_LOGS'
}

interface iPostbackLogs {
  items  : Array<object>;
  pagination : Object;
}

export interface PostbackLogsState {
  logs  : iPostbackLogs;
  error : Object;
  loading: boolean;
}