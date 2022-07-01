import {GeoTypes, GeoState} from "./actionTypes";
import Geo from "../../pages/Geo";

export const INIT_STATE : GeoState = {
  geo: {items: [], pagination: {}},
  error: {},
  loading: false,
  loaded: false,
  addLoading: false,
  addLoaded: false,
  profile: {},
  loadingProfile: false,
  loadedProfile: false,
  delete: {items: [], isOk: false, modal: false}
}

const geo = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GeoTypes.GET_GEO:
      return{
        ...state,
        loading: true,
        loaded: false,
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

    case GeoTypes.GET_GEO_PROFILE:
      return {
        ...state,
        loadingProfile: true,
      }

    case GeoTypes.GET_GEO_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: {},
        loadingProfile: false,
        loadedProfile: true,
      }

    case GeoTypes.GET_GEO_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
        loadingProfile: false,
        loadedProfile: false,
      }

    case GeoTypes.UPDATE_GEO:
      return {
        ...state,
        loading: true,
        loaded: false,
      }

    case GeoTypes.UPDATE_GEO_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: {},
        loading: false,
        loaded: true
      }

    case GeoTypes.UPDATE_GEO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case GeoTypes.ADD_GEO:
      return {
        ...state,
        loading: true,
        loaded: false,
      }

    case GeoTypes.ADD_GEO_SUCCESS:
      return{
        ...state,
        // geo: {
        //   ...state.geo,
        //   items: [action.payload, ...state.geo.items]
        // },
        error: {},
        loading: false,
        loaded: true
      }

    case GeoTypes.ADD_GEO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case GeoTypes.DEL_GEO:
      return {
        ...state,
        loading: true,
        loaded: false
      }

    case GeoTypes.DEL_GEO_SUCCESS:
      let resObject = {};
      if (!action.payload.isOk) {
        resObject = {
          ...state,
          delete: {
            ...state.delete,
            items: action.payload.items,
            isOk: action.payload.isOk,
            modal: true
          },
          loading: false,
          loaded: true
        }
      } else {
        resObject = {
          ...state,
          geo: {
            ...state.geo,
            items: state.geo.items.filter(item => item.id !== action.id)
          },
          delete: action.payload,
          loading: false,
          loaded: true
        }
      }
      return resObject;


    case GeoTypes.DEL_GEO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: true,
        loaded: false
      }

    case GeoTypes.MODAL_SHOW:
      return {
        ...state,
        delete: {
          ...state.delete,
          modal: action.payload
        }
      }

    case GeoTypes.MODAL_HIDE:
      return {
        ...state,
        delete: {
          ...state.delete,
          modal: false
        }
      }

    case GeoTypes.CLEAR_GEO:
      return INIT_STATE

    default:
      return state;
  }
}

export default geo