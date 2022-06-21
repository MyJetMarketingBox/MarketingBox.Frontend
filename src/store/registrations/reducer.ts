import {RegistrationsTypes, RegistrationsState} from "./actionTypes";

export const INIT_STATE : RegistrationsState = {
  registrations: {items: [], pagination: {}},
  error: {},
  loading: false,
  loaded: false,
  status_log: [],
  errorLog: {},
  loadingLog: false,
  loadedLog: false,
  errorUpdate: {},
  loadingUpdate: false,
  loadedUpdate: false,
}

const registrations = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case RegistrationsTypes.GET_REGISTRATIONS:
      return {
        ...state,
        loading: true
      }

    case RegistrationsTypes.GET_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        registrations: {
          items: [...state.registrations.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
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

    case RegistrationsTypes.UPDATE_STATUS:
      return {
        ...state,
        errorUpdate: {},
        loadingUpdate: true,
      }

    case RegistrationsTypes.UPDATE_STATUS_SUCCESS:

      const items = state.registrations.items.map((item : any) => {
       if(item.registrationId === action.payload.registrationId) {
         return action.payload
       }
       return item
      })

      return {
        ...state,
        registrations: {
          ...state.registrations,
          items
        },
        loadingUpdate: false,
        loadedUpdate: true,
      }

    case RegistrationsTypes.UPDATE_STATUS_FAIL:
      return {
        ...state,
        errorUpdate: action.payload,
        loadingUpdate: false,
        loadedUpdate: false,
      }

    case RegistrationsTypes.GET_STATUS_LOG:
      return {
        ...state,
        loadingLog: true
      }

    case RegistrationsTypes.GET_STATUS_LOG_SUCCESS:
      return {
        ...state,
        status_log: action.payload,
        loadingLog: false,
        loadedLog: true,
      }

    case RegistrationsTypes.GET_STATUS_LOG_FAIL:
      return {
        ...state,
        errorLog: action.payload,
        loadingLog: false,
        loadedLog: false
      }



    case RegistrationsTypes.CLEAR_REGISTRATIONS:
      return INIT_STATE

    default:
      return state
  }
}

export default registrations