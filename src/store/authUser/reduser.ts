import {
  LOCAL_STORAGE_TOKEN,
} from "./../../constants/localStorageKeys";
import { Reducer } from "react";
import {
  AuthUserActionEnum,
  AuthUserStoreType,
  IAuthApiErrorAction,
  ILogInUserAction,
  ILogInUserSuccessAction,
  ILogoutUserAction,
  ISetAuthTokenAction,
  ISignUpUserAction,
  ISignUpUserFailAction,
  ISignUpUserSuccessAction,
} from "./actionTypes";
import parseJwt from "src/common/utils/parse";
import { getAuthUserInfo } from "src/helpers/getAuthUserInfo";

const authUserInfo: any = getAuthUserInfo();

const initialStore: AuthUserStoreType = {
  isLoading: false,
  isAuthorization: !!authUserInfo,
  userInfo: authUserInfo,
  apiError: null,
};

type action =
  | ILogInUserAction
  | ILogInUserSuccessAction
  | IAuthApiErrorAction
  | ISetAuthTokenAction
  | ILogoutUserAction
  | ISignUpUserAction
  | ISignUpUserSuccessAction
  | ISignUpUserFailAction;

const authUser: Reducer<AuthUserStoreType, action> = (
  store = initialStore,
  action
) => {
  switch (action.type) {
    case AuthUserActionEnum.SET_TOKEN:
      localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(action.payload));
      const userInfo = parseJwt(action.payload);

      return {
        ...store,
        userInfo,
      };

    // SIGN UP
    case AuthUserActionEnum.REGISTER_USER:
      return {
        ...store,
        apiError: null,
        isLoading: true,
      };

    case AuthUserActionEnum.REGISTER_USER_SUCCESSFUL:
      return {
        ...store,
        isAuthorization: true,
        apiError: null,
        isLoading: false,
      };

    case AuthUserActionEnum.REGISTER_USER_FAILED:
      return {
        ...store,
        isLoading: false,
        apiError: action.payload,
      };
    // SIGN UP

    // SIGN IN
    case AuthUserActionEnum.LOGIN:
      return {
        ...store,
        apiError: null,
        isLoading: true,
      };

    case AuthUserActionEnum.LOGIN_SUCCESS:
      return {
        ...store,
        apiError: null,
        isAuthorization: true,
        isLoading: false,
      };

    case AuthUserActionEnum.AUTH_API_ERROR:
      return {
        ...store,
        isLoading: false,
        apiError: action.payload,
      };
    // SIGN IN

    case AuthUserActionEnum.LOGOUT:
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      return {
        ...store,
        isAuthorization: false,
        userInfo: null,
      };

    default:
      return store;
  }
};

export default authUser;
