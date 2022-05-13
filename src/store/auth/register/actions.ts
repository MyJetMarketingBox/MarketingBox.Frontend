import {RegisterTypes} from "./actionTypes"

export const registerUser = (user : any) => {
  return {
    type: RegisterTypes.REGISTER_USER,
    payload: { user },
  }
}

export const registerUserSuccessful = (user : any) => {
  return {
    type: RegisterTypes.REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = (error : any) => {
  return {
    type: RegisterTypes.REGISTER_USER_FAILED,
    payload: error,
  }
}

export const clearRegisterUser = () => ({
  type: RegisterTypes.CLEAR_REGISTER_USER,
})
