import {AffiliatesTypes, AffiliatesState} from "../affiliates/actionTypes";

export const INIT_STATE : AffiliatesState = {
  affiliates: {items: [], pagination: {}},
  affiliateProfile: {},
  error: {},
  loading: false,
  loaded: false,
  success: false
}

const affiliates = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case AffiliatesTypes.GET_AFFILIATES:
      return {
        ...state,
        loading: true,
      }

    case AffiliatesTypes.GET_AFFILIATES_SUCCESS:
      return {
        ...state,
        affiliates: {
          items: [...state.affiliates.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true,
      }

    case AffiliatesTypes.GET_AFFILIATES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      }

    case AffiliatesTypes.CLEAR_AFFILIATE:
      return {
        ...state,
        affiliates: {items: [], pagination: {}},
        loaded: false,
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

    case AffiliatesTypes.ADD_NEW_AFFILIATE:
      return {
        ...state,
        loading: true,
      }

    case AffiliatesTypes.ADD_AFFILIATE_SUCCESS:
      return {
        ...state,
        affiliates: {
          ...state.affiliates,
          items: [action.payload, ...state.affiliates.items]
        },
        error: {},
        loading: false,
      }

    case AffiliatesTypes.ADD_AFFILIATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case AffiliatesTypes.UPDATE_AFFILIATE:
      return {
        ...state,
        error: {},
        loading: true,
        success: false
      }

    case AffiliatesTypes.UPDATE_AFFILIATE_SUCCESS:
      return {
        ...state,
        affiliateProfile: action.payload,
        error: {},
        loading: false,
        success: true
      }

    case AffiliatesTypes.UPDATE_AFFILIATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case AffiliatesTypes.DELETE_AFFILIATE_SUCCESS:
      return {
        ...state,
        affiliates: {
          ...state.affiliates,
          items: state.affiliates.items.filter(
            affiliate => affiliate.affiliateId.toString() !== action.payload.toString()
          ),
        }
      }

    case AffiliatesTypes.DELETE_AFFILIATE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default affiliates
