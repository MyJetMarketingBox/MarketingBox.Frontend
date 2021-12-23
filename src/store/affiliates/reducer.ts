import {AffiliatesTypes, AffiliatesState} from "../affiliates/actionTypes";

export const INIT_STATE : AffiliatesState = {
  affiliates: [],
  affiliatesProfile: {},
  error: {},
}

const affiliates = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case AffiliatesTypes.GET_AFFILIATES_SUCCESS:
      return {
        ...state,
        affiliates: action.payload,
      }

    case AffiliatesTypes.GET_AFFILIATES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default affiliates