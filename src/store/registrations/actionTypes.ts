export enum RegistrationsTypes {
  /** Get Registrations */
  GET_REGISTRATIONS = "@@registrations/GET_REGISTRATIONS",
  GET_REGISTRATIONS_SUCCESS = "@@registrations/GET_REGISTRATIONS_SUCCESS",
  GET_REGISTRATIONS_FAIL = "@@registrations/GET_REGISTRATIONS_FAIL",

  GET_STATUS_LOG = "@@registrations/GET_STATUS_LOG",
  GET_STATUS_LOG_SUCCESS = "@@registrations/GET_STATUS_LOG_SUCCESS",
  GET_STATUS_LOG_FAIL = "@@registrations/GET_STATUS_LOG_FAIL",

  UPDATE_STATUS = "@@registrations/UPDATE_STATUS",
  UPDATE_STATUS_SUCCESS = "@@registrations/UPDATE_STATUS_SUCCESS",
  UPDATE_STATUS_FAIL = "@@registrations/UPDATE_STATUS_FAIL",

  /* CLEAR Registrations */
  CLEAR_REGISTRATIONS = "@@contact/CLEAR_REGISTRATIONS",
}

interface iRegistrations {
  items: Array<object>;
  pagination: Object;
}

export interface RegistrationsState {
  registrations: iRegistrations;
  error: Object;
  loading: boolean;
  loaded: boolean;
  status_log: Array<object>,
  errorLog: Object;
  loadingLog: boolean;
  loadedLog: boolean;

  errorUpdate: Object;
  loadingUpdate: boolean;
  loadedUpdate: boolean;
}
