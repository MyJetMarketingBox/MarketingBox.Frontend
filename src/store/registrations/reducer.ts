import {RegistrationsTypes, RegistrationsState} from "./actionTypes";

export const INIT_STATE : RegistrationsState = {
  registrations: {items: [], pagination: {}},
  error: {},
  loading: false,
  loaded: false,
}

const registrations = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case RegistrationsTypes.GET_REGISTRATIONS:
      return {
        ...state,
        error: {},
        loading: true
      }

    case RegistrationsTypes.GET_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        registrations: {
          items: [...state.registrations.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        error: {},
        loading: false,
        loaded: true
      }

    case RegistrationsTypes.GET_REGISTRATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case RegistrationsTypes.CLEAR_REGISTRATIONS:
      return INIT_STATE

    default:
      return state
  }
}

export default registrations