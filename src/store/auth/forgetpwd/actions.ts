import { ForgetPwdTypes } from "./actionTypes";

export const userForgetPassword = (email: string) => {
  return {
    type: ForgetPwdTypes.FORGET_PASSWORD,
    payload: email,
  };
};

export const userForgetPasswordSuccess = (message: string) => {
  return {
    type: ForgetPwdTypes.FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userForgetPasswordError = (message: any) => {
  return {
    type: ForgetPwdTypes.FORGET_PASSWORD_ERROR,
    payload: message,
  };
};

export const userResetPassword = (data: {
  token: string;
  newPassword: string;
}) => {
  return {
    type: ForgetPwdTypes.RESET_PASSWORD,
    payload: data,
  };
};

export const userResetPasswordSuccess = (message: string) => {
  return {
    type: ForgetPwdTypes.RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userResetPasswordError = (message: any) => {
  return {
    type: ForgetPwdTypes.RESET_PASSWORD_ERROR,
    payload: message,
  };
};

export const userForgotPasswordClearStore = () => ({
  type: ForgetPwdTypes.CLEAR_STORE,
});
