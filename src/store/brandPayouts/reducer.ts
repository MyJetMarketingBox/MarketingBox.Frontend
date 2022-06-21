import {BrandPayoutsType, BrandPayoutsState} from "./actionTypes";

export const INIT_STATE : BrandPayoutsState = {
  brandPayouts  : { items: [], pagination: {} },
  error : {},
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  loadedItem: false,
  errorUpdate: {},
  loadingUpdate: false,
  loadedUpdate: false,
  loadingDel: false,
  loadedDel: false,
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

    case BrandPayoutsType.UPDATE_PAYOUT:
      return {
        ...state,
        loadingUpdate: true,
        loadedUpdate: false
      }

    case BrandPayoutsType.UPDATE_PAYOUT_SUCCESS:

      const items = state.brandPayouts.items.map((item: any) => {
        if(item.id === action.payload.id){
          return action.payload
        }
        return item
      })

      return {
        ...state,
        brandPayouts: {
          ...state.brandPayouts,
          items
        },
        loadingUpdate: false,
        loadedUpdate: true
      }

    case BrandPayoutsType.UPDATE_PAYOUT_FAIL:
      return {
        errorUpdate: action.payload,
        loadingUpdate: false,
        loadedUpdate: false
      }

    case BrandPayoutsType.DEL_PAYOUT:
      return{
        ...state,
        loadingDel: true,
        loadedDel: false
      }

    case BrandPayoutsType.DEL_PAYOUT_SUCCESS:
      return{
        ...state,
        brandPayouts: {
          ...state.brandPayouts,
          items: state.brandPayouts.items.filter(item => item.id !== action.payload)
        },
        loadingDel: false,
        loadedDel: true
      }

    case BrandPayoutsType.DEL_PAYOUT_FAIL:
      return{
        ...state,
        error: action.payload,
        loadingDel: false,
        loadedDel: false
      }

    case BrandPayoutsType.CLEAR_BRAND_PAYOUTS:
      return INIT_STATE

    default:
      return state
  }
}

export default brandPayouts