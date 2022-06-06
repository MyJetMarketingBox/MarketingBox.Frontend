import { RedistributionState, RedistributionTypes } from "./actionTypes";

export const INIT_STATE : RedistributionState = {
  data: {
    items: [],
    pagination: {}
  },
  error: {},
  loading: false,
  loaded: false,
  errorUpdate: {},
  loadingUpdate: false,
  loadedUpdate: false,
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
          items: [...state.data.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true
      }

    case RedistributionTypes.GET_REDISTRIBUTION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case RedistributionTypes.UPDATE_STATUS:
      return {
        ...state,
        errorUpdate: {},
        loadingUpdate: true,
      }

    case RedistributionTypes.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.map((item : any) =>
            item.id.toString() === action.payload.id.toString()
              ? action.payload
              : item
          ),
        },
        loadingUpdate: false,
        loadedUpdate: true,
      }

    case RedistributionTypes.UPDATE_STATUS_FAIL:
      return {
        ...state,
        errorUpdate: action.payload,
        loadingUpdate: false,
        loadedUpdate: false,
      }

    case RedistributionTypes.CLEAR_REDISTRIBUTION:
      return INIT_STATE

    default:
      return state
  }
}

export default redistribution