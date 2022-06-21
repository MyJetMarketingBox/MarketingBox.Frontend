import { ForgetPwdTypes } from "./actionTypes";

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  forgotLoading: false,

  resetPasswordError: null,
  resetPasswordSuccess: null,
  resetLoading: false,
};

const forgetPassword = (state = initialState, action: any) => {
  switch (action.type) {
    case ForgetPwdTypes.FORGET_PASSWORD:
      return {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        forgotLoading: true,
      };

    case ForgetPwdTypes.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotLoading: false,
        forgetSuccessMsg: action.payload,
      };

    case ForgetPwdTypes.FORGET_PASSWORD_ERROR:
      return { ...state, forgotLoading: false, forgetError: action.payload };

    case ForgetPwdTypes.RESET_PASSWORD:
      return {
        ...state,
        resetLoading: true,
        resetPasswordError: null,
      };

    case ForgetPwdTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetLoading: false,
        resetPasswordSuccess: action.payload,
      };

    case ForgetPwdTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetLoading: false,
        resetPasswordError: action.payload,
      };

    case ForgetPwdTypes.CLEAR_STORE:
      return initialState;

    default:
      return state;
  }
  return state;
};

export default forgetPassword;
