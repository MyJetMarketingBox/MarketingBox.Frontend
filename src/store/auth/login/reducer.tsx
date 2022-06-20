import parseJwt from "src/common/utils/parse";
import { getLoggedInUser } from "src/helpers/backend_helper";
import { LoginTypes } from "./actionTypes";

const token = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser") || "")?.token
  : "";

const initialState = {
  token: token || "",
  isAuthorization: !!token,
  error: "",
  userInfo: getLoggedInUser(),
  loading: false,
};

const login = (state = initialState, action: any) => {
  switch (action.type) {
    case LoginTypes.LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case LoginTypes.LOGIN_SUCCESS:
      const userInfo = parseJwt(action.payload);

      return {
        ...state,
        isAuthorization: true,
        token: JSON.parse(action.payload).token,
        userInfo,
        loading: false,
      };

    case LoginTypes.LOGOUT_USER:
      return { ...initialState };

    case LoginTypes.API_ERROR:
      return { ...state, error: action.payload.message, loading: false };

    default:
      return state;
  }
};

export default login;
