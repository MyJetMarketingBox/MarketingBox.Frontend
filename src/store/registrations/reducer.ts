import {RegistrationsTypes, RegistrationsState} from "../registrations/actionTypes";

export const INIT_STATE : RegistrationsState = {
  registrations: {items: [], pagination: {}},
  registrationProfile: {},
  error: {},
  loading: false,
}

const registrations = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case RegistrationsTypes.GET_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        registrations: {
          items: [...state.registrations.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
      }

    case RegistrationsTypes.GET_REGISTRATIONS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default registrations