import {BrandProfileTypes, BrandProfileState} from "./actionTypes";

export const INIT_STATE : BrandProfileState = {
  brand: {},
  error: {},
  loading: false,
  loaded: false,
  upLoading: false,
  upLoaded: false,
}

const brandProfile = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case BrandProfileTypes.GET_BRAND_PROFILE:
      return {
        ...state,
        loading: true
      }

    case BrandProfileTypes.GET_BRAND_PROFILE_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        loading: false,
        loaded: true,
      }

    case BrandProfileTypes.GET_BRAND_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case BrandProfileTypes.UPDATE_BRAND_PROFILE:
      return {
        ...state,
        upLoading: true,
      }

    case BrandProfileTypes.UPDATE_BRAND_PROFILE_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        upLoading: false,
        upLoaded: true,
      }

    case BrandProfileTypes.UPDATE_BRAND_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        upLoading: false
      }

    case BrandProfileTypes.CLEAR_BRAND_PROFILE:
      return INIT_STATE;

    default:
      return state
  }
}

export default brandProfile