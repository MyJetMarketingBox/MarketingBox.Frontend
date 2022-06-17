import {AffiliatesTypes, AffiliatesState} from "./actionTypes";

export const INIT_STATE : AffiliatesState = {
  affiliates: {items: [], pagination: {}},
  error: {},
  loading: false,
  loaded: false,
  success: false,
  addAffLoading: false,
  addAffSuccess: false,
  addAffError: false
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

    case AffiliatesTypes.CLEAR_AFFILIATE_ERROR:
      return {
        ...state,
        error: {}
      }

    case AffiliatesTypes.ADD_NEW_AFFILIATE:
      return {
        ...state,
        addAffLoading: true,
        addAffSuccess: false,
        addAffError: false,
      }

    case AffiliatesTypes.ADD_AFFILIATE_SUCCESS:
      return {
        ...state,
        affiliates: {
          ...state.affiliates,
          items: [action.payload, ...state.affiliates.items]
        },
        error: {},
        addAffLoading: false,
        addAffSuccess: true,
      }

    case AffiliatesTypes.ADD_AFFILIATE_FAIL:
      return {
        ...state,
        error: action.payload,
        addAffLoading: false,
        addAffError: true,
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
