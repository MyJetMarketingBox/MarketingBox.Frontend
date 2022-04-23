import {AffProfileTypes, AffProfileState} from "./actionTypes";

export const INIT_STATE : AffProfileState = {
  affProfile: {},
  error: {},
  loading: false,
  loaded: false,
}

const affProfile = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case AffProfileTypes.GET_AFFILIATE_PROFILE:
      return {
        ...state,
        loading: true,
      }

    case AffProfileTypes.GET_AFFILIATE_PROFILE_SUCCESS:
      return {
        ...state,
        affProfile: action.payload,
        loading: false,
        loaded: true,
      }

    case AffProfileTypes.GET_AFFILIATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false,
      }

    case AffProfileTypes.CLEAR_AFFILIATE_PROFILE:
      return INIT_STATE

    default:
      return state
  }
}

export default affProfile