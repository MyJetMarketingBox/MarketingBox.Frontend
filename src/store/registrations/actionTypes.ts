export enum RegistrationsTypes {
  /** Get Registrations */
  GET_REGISTRATIONS = "@@registrations/GET_REGISTRATIONS",
  GET_REGISTRATIONS_SUCCESS = "@@registrations/GET_REGISTRATIONS_SUCCESS",
  GET_REGISTRATIONS_FAIL = "@@registrations/GET_REGISTRATIONS_FAIL",

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
}
