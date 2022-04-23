import {AffPayoutsTypes, AffPayoutsState} from "./actionTypes";

export const INIT_STATE : AffPayoutsState = {
  affPayouts  : { items: [], pagination: {} },
  error : Object,
  loadingList: false,
  loadedList: false,
  loadingItem: false,
  loadedItem: false,
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
          loadingList: false,
          loadedList: true,
        }
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

    case AffPayoutsTypes.CLEAR_AFF_PAYOUTS:
      return INIT_STATE

    default:
        return state
  }

}

export default affPayouts