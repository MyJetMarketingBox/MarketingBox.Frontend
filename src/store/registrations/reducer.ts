import {RegistrationsTypes, RegistrationsState} from "../registrations/actionTypes";

export const INIT_STATE : RegistrationsState = {
  registrations: {items: [], pagination: {}},
  error: {},
  loading: false,
}

const registrations = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case RegistrationsTypes.CLEAR_REGISTRATIONS:
      return INIT_STATE

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
        loading: false
      }

    case RegistrationsTypes.GET_REGISTRATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default registrations