import {GeoTypes, GeoState} from "./actionTypes";

export const INIT_STATE : GeoState = {
  geo: {items: [], pagination: {}},
  error: {},
  loading: false,
  loaded: false,
}

const geo = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GeoTypes.GET_GEO:
      return{
        ...state,
        loading: true,
      }

    case GeoTypes.GET_GEO_SUCCESS:
      return {
        ...state,
        geo: {
          items: [...state.geo.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true,
      }

    case GeoTypes.GET_GEO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      }

    case GeoTypes.CLEAR_GEO:
      return INIT_STATE

    default:
      return state;
  }
}

export default geo