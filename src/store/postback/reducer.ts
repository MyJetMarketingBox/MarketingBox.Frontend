import {PostbackState, PostbackTypes} from "./actionTypes";
import { cssTransition } from "react-toastify";

export const INIT_STATE : PostbackState = {
  postback: {items: [], pagination: {}},
  item: {},
  error: {},
  loading: false,
  loaded: false,
  success: false,
  addPostbackLoading: false,
  addPostbackSuccess: false,
  addPostbackError: false,
  upLoading: false,
  upLoaded: false,
}

const postback = (state = INIT_STATE, action: any) => {

  switch (action.type) {

    case PostbackTypes.GET_POSTBACK :
      return {
        ...state,
        loading: true,
      }

    case PostbackTypes.GET_POSTBACK_SUCCESS:
      return {
        ...state,
        item: action.payload,
        /*postback: {
          items: [...state.postback.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },*/
        loading: false,
        loaded: true,
      }

    case PostbackTypes.GET_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload.response,
        loading: false,
        loaded: false,
      }

    case PostbackTypes.ADD_POSTBACK:
      return {
        ...state,
        loading: true,
      }

    case PostbackTypes.ADD_POSTBACK_SUCCESS:
      return {
        ...state,
        item: action.payload,
        /*postback: {
          ...state.postback,
          items: [...action.payload, ...state.postback.items],
          pagination: { ...action.payload.pagination },
        },*/
        loaded: true,
        loading: false,
      }

    case PostbackTypes.ADD_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case PostbackTypes.UPDATE_POSTBACK:
      return {
        ...state,
        upLoading: true,
        upLoaded: false
      }

    case PostbackTypes.UPDATE_POSTBACK_SUCCESS:
      return {
        ...state,
        item: action.payload,
        upLoading: false,
        upLoaded: true
      }

    case PostbackTypes.UPDATE_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload,
        upLoading: false,
        upLoaded: false
      }

    case PostbackTypes.DEL_POSTBACK:
      return {
        ...state,
        loading: true,
      }

    case PostbackTypes.DEL_POSTBACK_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        loaded: false
      }

    case PostbackTypes.DEL_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case PostbackTypes.CLEAR_POSTBACK :
      return INIT_STATE;

    default:
      return state
  }

}

export default postback;