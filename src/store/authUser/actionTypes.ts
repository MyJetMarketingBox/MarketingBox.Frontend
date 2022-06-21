export enum AuthUserActionEnum {
  LOGIN = "@@authUser/login",
  LOGIN_SUCCESS = "@@authUser/login-success",

  REGISTER_USER = "@@authUser/REGISTER_USER",
  REGISTER_USER_SUCCESSFUL = "@@authUser/REGISTER_USER_SUCCESSFUL",
  REGISTER_USER_FAILED = "@@authUser/REGISTER_USER_FAILED",

  LOGOUT = "@@authUser/logout",

  SET_TOKEN = "@@authUser/set-token",
  AUTH_API_ERROR = "@@authUser/auth-api-error",
}

// store
export interface AuthUserStoreType {
  isLoading: boolean;
  isAuthorization: boolean;
  apiError: string | null;
  userInfo: AuthUserInfoType | null;
}

// credentials
export interface AuthUserResponse {
  token: string;
  expiresAt: string;
}

export interface AuthUserInfoType {
  "user-name": string;
  "user-id": string;
  aud: string;
  "tenant-id": string;
}

// ACTIONS TYPE

export interface ILogInUserAction {
  type: AuthUserActionEnum.LOGIN;
  payload: {
    user: {
      email: string;
      password: string;
    };
  };
}

export interface ISignUpUserAction {
  type: AuthUserActionEnum.REGISTER_USER;
}
export interface ISignUpUserSuccessAction {
  type: AuthUserActionEnum.REGISTER_USER_SUCCESSFUL;
}
export interface ISignUpUserFailAction {
  type: AuthUserActionEnum.REGISTER_USER_FAILED;
  payload: any;
}

export interface ILogInUserSuccessAction {
  type: AuthUserActionEnum.LOGIN_SUCCESS;
  payload: AuthUserResponse;
}

export interface IAuthApiErrorAction {
  type: AuthUserActionEnum.AUTH_API_ERROR;
  payload: string;
}

export interface ISetAuthTokenAction {
  type: AuthUserActionEnum.SET_TOKEN;
  payload: string;
}

export interface ILogoutUserAction {
  type: AuthUserActionEnum.LOGOUT;
  history: any;
}
