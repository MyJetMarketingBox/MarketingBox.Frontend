import { LoginTypes } from "./actionTypes";

const initialState = {
  error: "",
  userInfo: {
    'user-id': null,
    'user-name': null
  },
  loading: false,
};

const login = (state = initialState, action: any) => {
  switch (action.type) {
    case LoginTypes.LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LoginTypes.LOGIN_SUCCESS:
      state = {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
      break;
    case LoginTypes.LOGOUT_USER:
      state = { ...state };
      break;
    case LoginTypes.LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case LoginTypes.API_ERROR:
      state = { ...state, error: action.payload.message, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
