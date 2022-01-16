import {AffiliatesTypes, AffiliatesState} from "../affiliates/actionTypes";

export const INIT_STATE : AffiliatesState = {
  affiliates: {items: [], pagination: {}},
  affiliateProfile: {},
  error: {},
}

const affiliates = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case AffiliatesTypes.GET_AFFILIATES_SUCCESS:
      return {
        ...state,
        affiliates: {
          items: [...state.affiliates.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
      }

    case AffiliatesTypes.GET_AFFILIATES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case AffiliatesTypes.GET_AFFILIATE_PROFILE_SUCCESS:
      return {
        ...state,
        affiliateProfile: action.payload,
      }

    case AffiliatesTypes.GET_AFFILIATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default affiliates