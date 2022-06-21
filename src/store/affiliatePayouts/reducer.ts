import {AffPayoutsTypes, AffPayoutsState} from "./actionTypes";

export const INIT_STATE : AffPayoutsState = {
  affPayouts  : { items: [], pagination: {} },
  error : Object,
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  loadedItem: false,
  errorUpdate: {},
  loadingUpdate: false,
  loadedUpdate: false,
  loadingDel: false,
  loadedDel: false
}

const affPayouts = (state = INIT_STATE, action : any) => {

  switch (action.type) {
    case AffPayoutsTypes.GET_AFF_PAYOUTS:
      return {
        ...state,
        loadingList: true
      }

    case AffPayoutsTypes.GET_AFF_PAYOUTS_SUCCESS:
      return {
        ...state,
        affPayouts : {
          items: [...state.affPayouts.items, ...action.payload.items],
          pagination: {...action.payload.pagination},
        },
        loadingList: false,
        loadedList: true,
      }

    case AffPayoutsTypes.GET_AFF_PAYOUTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingList: false,
        loadedList: false,
      }

    case AffPayoutsTypes.ADD_AFF_PAYOUTS:
      return {
        ...state,
        loadingItem: true,
      }

    case AffPayoutsTypes.ADD_AFF_PAYOUTS_SUCCESS:
      return{
        ...state,
        affPayouts: {
          ...state.affPayouts,
          items: [action.payload, ...state.affPayouts.items]
        },
        loadingItem: false,
        loadedItem: true
      }

    case AffPayoutsTypes.ADD_AFF_PAYOUTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingItem: false,
        loadedItem: false,
      }

    case AffPayoutsTypes.ADD_PAYOUT:
      return {
        ...state,
        loadingItem: true,
      }

    case AffPayoutsTypes.ADD_PAYOUT_SUCCESS:
      return{
        ...state,
        affPayouts: {
          ...state.affPayouts,
          items: [action.payload, ...state.affPayouts.items]
        },
        loadingItem: false,
        loadedItem: true
      }

    case AffPayoutsTypes.ADD_PAYOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingItem: false,
        loadedItem: false,
      }

    case AffPayoutsTypes.UPDATE_PAYOUT:
      return {
        ...state,
        loadingUpdate: true,
      }

    case AffPayoutsTypes.UPDATE_PAYOUT_SUCCESS:

      const items = state.affPayouts.items.map((item : any) => {
        if(item.id === action.payload.id){
          return action.payload
        }
        return item
      })

      return {
        ...state,
        affPayouts: {
          ...state.affPayouts,
          items
        },
        errorUpdate: {},
        loadingUpdate: false,
        loadedUpdate: true,
      }

    case AffPayoutsTypes.UPDATE_PAYOUT_FAIL:
      return {
        ...state,
        errorUpdate: action.payload,
        loadingUpdate: false,
        loadedUpdate: false,
      }

    case AffPayoutsTypes.DELETE_PAYOUT:
      return{
        ...state,
        loadingDel: true,
        loadedDel: false
      }

    case AffPayoutsTypes.DELETE_PAYOUT_SUCCESS:
      return {
        ...state,
        affPayouts: {
          ...state.affPayouts,
          items: state.affPayouts.items.filter(item => item.id !== action.payload)
        },
        loadingDel: false,
        loadedDel: true
      }

    case AffPayoutsTypes.DELETE_PAYOUT_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingDel: false,
        loadedDel: false
      }

    case AffPayoutsTypes.CLEAR_AFF_PAYOUTS:
      return INIT_STATE

    default:
        return state
  }

}

export default affPayouts