import {
  BadRequestsActionEnum,
  IAction,
  IBadRequestStore,
} from "./actionTypes";

const initStore: IBadRequestStore = {
  isInternetError: false,
  isRecconectPopup: false,
  isReloadPopup: false,
  errorText: "",
};

const badRequests = (
  store: IBadRequestStore = initStore,
  action: IAction
): IBadRequestStore => {
  switch (action.type) {
    // internet
    case BadRequestsActionEnum.SET_INTERNET_ERROR:
      return { ...store, isInternetError: true };
    case BadRequestsActionEnum.STOP_INTERNET_ERROR:
      return { ...store, isInternetError: false };

    // reload popup
    case BadRequestsActionEnum.SET_RELOAD_POPUP:
      return { ...store, isReloadPopup: true };
    case BadRequestsActionEnum.HIDE_RELOAD_POPUP:
      return { ...store, isReloadPopup: false };

    // reconnect
    case BadRequestsActionEnum.SET_REQUEST_RECONECT:
      return { ...store, isRecconectPopup: true };
    case BadRequestsActionEnum.STOP_REQUEST_RECONECT:
      return { ...store, isRecconectPopup: false };

    // error text
    case BadRequestsActionEnum.SET_ERROR_TEXT:
      return {
        ...store,
        errorText: action.payload || "",
      };
    case BadRequestsActionEnum.CLEAR_ERROR_TEXT:
      return {
        ...store,
        errorText: "",
      };
    default:
      return store;
  }
};

export default badRequests;
