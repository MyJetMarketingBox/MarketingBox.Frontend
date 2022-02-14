import {RegistrationsTypes} from "./actionTypes"

export const getRegistrations = (nextUrl: any, filter: object) => ({
  type: RegistrationsTypes.GET_REGISTRATIONS,
  nextUrl,
  filter
})

export const getRegistrationsSuccess = (registrations : any) => ({
  type: RegistrationsTypes.GET_REGISTRATIONS_SUCCESS,
  payload: registrations,
})

export const getRegistrationsFail = (error : any) => ({
  type: RegistrationsTypes.GET_REGISTRATIONS_FAIL,
  payload: error,
})

export const clearRegistrations = () => ({
  type: RegistrationsTypes.CLEAR_REGISTRATIONS,
})