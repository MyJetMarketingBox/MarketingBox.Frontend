import {BrandPayoutsType, BrandPayoutsState} from "./actionTypes";

export const INIT_STATE : BrandPayoutsState = {
  brandPayouts  : { items: [], pagination: {} },
  error : {},
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  loadedItem: false,
}

const brandPayouts = (state = INIT_STATE, action: any) => {
  switch(action.type){
    case BrandPayoutsType.GET_BRAND_PAYOUTS:
      return {
        ...state,
        loadingList: true
      }

    case BrandPayoutsType.GET_BRAND_PAYOUTS_SUCCESS:
      return {
        ...state,
        brandPayouts: {
          items: [...state.brandPayouts.items, ...action.payload.items],
          pagination: {...action.payload.pagination},
        },
        loadingList: false,
        loadedList: true,
      }

    case BrandPayoutsType.GET_BRAND_PAYOUTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingList: false,
        loadedList: false,
      }

    case BrandPayoutsType.ADD_BRAND_PAYOUT:
      return {
        ...state,
        loadedItem: true
      }

    case BrandPayoutsType.ADD_BRAND_PAYOUT_SUCCESS:
      return {
        ...state,
        brandPayouts: {
          ...state.brandPayouts,
          items: [action.payload, ...state.brandPayouts.items]
        },
        loadingItem: false,
        loadedItem: true
      }

    case BrandPayoutsType.ADD_BRAND_PAYOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingItem: false,
        loadedItem: false,
      }

    case BrandPayoutsType.ADD_PAYOUT:
      return {
        ...state,
        loadedItem: true
      }

    case BrandPayoutsType.ADD_PAYOUT_SUCCESS:
      return {
        ...state,
        brandPayouts: {
          ...state.brandPayouts,
          items: [action.payload, ...state.brandPayouts.items]
        },
        loadingItem: false,
        loadedItem: true
      }

    case BrandPayoutsType.ADD_PAYOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingItem: false,
        loadedItem: false,
      }

    case BrandPayoutsType.CLEAR_BRAND_PAYOUTS:
      return INIT_STATE

    default:
      return state
  }
}

export default brandPayouts