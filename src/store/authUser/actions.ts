import {
  AuthUserActionEnum,
  AuthUserResponse,
  ILogInUserAction,
} from "./actionTypes";

export const registerUserAction = (user: any, history: any) => {
  return {
    type: AuthUserActionEnum.REGISTER_USER,
    payload: { user, history },
  };
};

export const registerUserSuccessAction = () => {
  return {
    type: AuthUserActionEnum.REGISTER_USER_SUCCESSFUL,
  };
};

export const registerUserFailAction = (error: any) => {
  return {
    type: AuthUserActionEnum.REGISTER_USER_FAILED,
    payload: error,
  };
};

export const signInAction = (user: { email: string; password: string }) => ({
  type: AuthUserActionEnum.LOGIN,
  payload: {
    user,
  },
});

export const signInSuccessAction = () => ({
  type: AuthUserActionEnum.LOGIN_SUCCESS,
});

export const authApiErrorAction = (payload: any) => ({
  type: AuthUserActionEnum.AUTH_API_ERROR,
  payload,
});

export const authSetTokenAction = (token: string) => ({
  type: AuthUserActionEnum.SET_TOKEN,
  payload: token,
});

export const logoutUserAction = (history: any) => ({
  type: AuthUserActionEnum.LOGOUT,
  history,
});
