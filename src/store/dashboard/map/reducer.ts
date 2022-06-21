import {DashMapTypes, DashMapState} from "./actionTypes";

export const INIT_STATE: DashMapState = {
  countries: [],
  loading: false,
  loaded: false,
  error: {}
}

const dashMap = (state = INIT_STATE, action: any) => {
  switch (action.type) {

    case DashMapTypes.GET_DASH_MAP:
      return {
        ...state,
        loading: true
      }

    case DashMapTypes.GET_DASH_MAP_SUCCESS:
      return {
        ...state,
        countries: action.payload.countries,
        loading: false,
        loaded: true
      }

    case DashMapTypes.GET_DASH_MAP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case DashMapTypes.CLEAR_DASH_MAP:
      return INIT_STATE

    default:
      return state
  }
}

export default dashMap