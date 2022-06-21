import { BadRequestsActionEnum, IAction } from "./actionTypes";

// internet error
export const setInternetError = () => ({
  type: BadRequestsActionEnum.SET_INTERNET_ERROR,
});
export const stopInternetError = () => ({
  type: BadRequestsActionEnum.STOP_INTERNET_ERROR,
});

// reconnect
export const setRequestReconnect = () => ({
  type: BadRequestsActionEnum.SET_REQUEST_RECONECT,
});
export const stopRequestReconnect = () => ({
  type: BadRequestsActionEnum.STOP_REQUEST_RECONECT,
});

// reload popup
export const setReloadPopup = () => ({
  type: BadRequestsActionEnum.SET_RELOAD_POPUP,
});
export const hideReloadPopup = () => ({
  type: BadRequestsActionEnum.HIDE_RELOAD_POPUP,
});

// error text
export const setErrorText = (payload: string) => ({
  type: BadRequestsActionEnum.SET_ERROR_TEXT,
  payload,
});
export const clearErrorText = () => ({
  type: BadRequestsActionEnum.CLEAR_ERROR_TEXT,
});
