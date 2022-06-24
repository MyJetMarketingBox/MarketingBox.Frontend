import { ProfileTypes, ProfileState } from "./actionTypes"

export const INIT_STATE : ProfileState = {
  data: null,
  loading: false,
  loaded: false,
  error: {},
  upLoading: false,
  upLoaded: false,
  changePasswordLoading: false,
}

const profile = (state = INIT_STATE, action : any) => {
  switch (action.type) {
    case ProfileTypes.GET_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case ProfileTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };

    case ProfileTypes.GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false,
      };

    case ProfileTypes.UPDATE_PROFILE:
      return {
        ...state,
        error: {},
        upLoading: true,
      };

    case ProfileTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        upLoading: false,
        upLoaded: true,
      };

    case ProfileTypes.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        upLoading: false,
      };

    default:
      return state;
  }
};

export default profile
