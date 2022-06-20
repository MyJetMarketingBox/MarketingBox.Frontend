/**
 *  interface for Login Type
 */
export enum LoginTypes {
  LOGIN_USER = "@@login/LOGIN_USER",
  LOGIN_SUCCESS = "@@login/LOGIN_SUCCESS",
  LOGOUT_USER = "@@login/LOGOUT_USER",
  LOGOUT_USER_SUCCESS = "@@login/LOGOUT_USER_SUCCESS",
  API_ERROR = "@@login/API_ERROR",
}



export interface AuthUserInfoType {
  "user-name": string;
  "user-id": string;
  aud: string;
  "tenant-id": string;
}

export interface LoginStoreType {
  isAuthorization: boolean;
  token: string;
  loading: string;
  error: string;
  userInfo: AuthUserInfoType | null;
}
