export enum BadRequestsActionEnum {
  // internet
  SET_INTERNET_ERROR = "@@badRequest/set-internet-error",
  STOP_INTERNET_ERROR = "@@badRequest/stop-internet-error",

  // reconnect
  SET_REQUEST_RECONECT = "@@badRequest/set-request-reconnect",
  STOP_REQUEST_RECONECT = "@@badRequest/stop-request-reconnect",

  // reload
  SET_RELOAD_POPUP = "@@badRequest/set-reload-popup",
  HIDE_RELOAD_POPUP = "@@badRequest/hide-reload-popup",

  // error text
  SET_ERROR_TEXT = "@@badRequest/set-error-text",
  CLEAR_ERROR_TEXT = "@@badRequest/clear-error-text",
}

export interface IBadRequestStore {
  isInternetError: boolean;
  isRecconectPopup: boolean;
  isReloadPopup: boolean;
  errorText: string;
}

export interface IAction<T = null> {
  type: BadRequestsActionEnum;
  payload?: T;
}
