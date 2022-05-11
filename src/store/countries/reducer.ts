import {CountriesType, CountriesState} from "./actionTypes";

export const INIT_STATE: CountriesState = {
  value: {items: [], pagination: {}},
  error: Object,
  loading: false,
  loaded: false,
  success: false
}

const countries = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CountriesType.GET_COUNTRIES:
      return {
        ...state,
        loading: true
      }

    case CountriesType.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        value: {
          items: [...state.value.items, ...action.payload.items],
          pagination: {...action.payload.pagination}
        },
        loading: false,
        loaded: true
      }

    case CountriesType.GET_COUNTRIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }

    case CountriesType.CLEAR_COUNTRIES:
      return INIT_STATE

    default:
      return state
  }
}

export default countries