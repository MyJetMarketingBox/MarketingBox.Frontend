import {RedistributionTypes, RedistributionState} from "./actionTypes";

export const INIT_STATE : RedistributionState = {
  data: {
    items: [],
    pagination: {}
  },
  error: {},
  loading: false,
  loaded: false,
}

const redistribution = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case RedistributionTypes.GET_REDISTRIBUTION:
      return {
        ...state,
        loading: true
      }

    case RedistributionTypes.GET_REDISTRIBUTION_SUCCESS:
      return {
        ...state,
        data: {
          items: [...state.data.items, ...action.payload]
        },
        loading: false,
        loaded: true
      }

    case RedistributionTypes.GET_REDISTRIBUTION_FAIL:
      return{
        ...state,
        error: action.payload
      }

    case RedistributionTypes.CLEAR_REDISTRIBUTION:
      return INIT_STATE

    default:
      return state
  }
}

export default redistribution