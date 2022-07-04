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

export const updateRegistrationStatus = (id: number, request: object) => ({
  type: RegistrationsTypes.UPDATE_STATUS,
  id,
  request
})

export const updateRegistrationStatusSuccess = (registration: any) => ({
  type: RegistrationsTypes.UPDATE_STATUS_SUCCESS,
  payload: registration
})

export const updateRegistrationStatusFail = (error: any) => ({
  type: RegistrationsTypes.UPDATE_STATUS_SUCCESS,
  payload: error
})

export const getStatusLog = (filter: object) => ({
  type: RegistrationsTypes.GET_STATUS_LOG,
  filter,
})

export const getStatusLogSuccess = (data: any) => ({
  type: RegistrationsTypes.GET_STATUS_LOG_SUCCESS,
  payload: data,
})

export const getStatusLogFail = (error: any) => ({
  type: RegistrationsTypes.GET_STATUS_LOG_FAIL,
  payload: error,
})

export const clearRegistrations = () => ({
  type: RegistrationsTypes.CLEAR_REGISTRATIONS,
})

export const setModalStatus = (status: boolean) => ({
  type: RegistrationsTypes.MODAL_STATUS,
  status
})