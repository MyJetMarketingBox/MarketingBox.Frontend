import {RegisterTypes} from "./actionTypes"

const initialState = {
  user: null,
  error: {},
  message: null,
  loading: false,
}

const register = (state = initialState, action : any) => {
  switch (action.type) {
    case RegisterTypes.REGISTER_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case RegisterTypes.REGISTER_USER_SUCCESSFUL:
      state = {
        ...state,
        error: {},
        loading: false,
        user: action.payload,
      }
      break
    case RegisterTypes.REGISTER_USER_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      }
      break

    case RegisterTypes.CLEAR_REGISTER_USER:
      return initialState

    default:
      state = { ...state }
      break
  }
  return state
}

export default register;
