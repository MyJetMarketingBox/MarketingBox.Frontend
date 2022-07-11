import {PostbacksState, PostbackTypes} from "./actionTypes";
import { cssTransition } from "react-toastify";

export const INIT_STATE : PostbacksState = {
  data: {items: [], pagination: {}},
  item: {},
  error: {},
  loading: false,
  loaded: false,
  success: false,
  addLoading: false,
  addLoaded: false,
  addPostbackError: false,
  upLoading: false,
  upLoaded: false,
  modalPostback: false,
}

const postbacks = (state = INIT_STATE, action: any) => {

  switch (action.type) {

    case PostbackTypes.GET_POSTBACKS :
      return {
        ...state,
        loading: true,
      }

    case PostbackTypes.GET_POSTBACKS_SUCCESS:
      return {
        ...state,
        //item: action.payload,
        data: {
          items: [...state.data.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true,
      }

    case PostbackTypes.GET_POSTBACKS_FAIL:
      return {
        ...state,
        error: action.payload.response,
        loading: false,
        loaded: false,
      }

    case PostbackTypes.ADD_POSTBACK:
      return {
        ...state,
        addLoading: true,
      }

    case PostbackTypes.ADD_POSTBACK_SUCCESS:
      return {
        ...state,
        //item: action.payload,
        data: {
          ...state.data,
          items: [action.payload, ...state.data.items],
          //pagination: { ...action.payload.pagination },
        },
        addLoaded: true,
        addLoading: false,
      }

    case PostbackTypes.ADD_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload,
        addLoaded: false,
        addLoading: false,
      }

    case PostbackTypes.UPDATE_POSTBACK:
      return {
        ...state,
        upLoading: true,
        upLoaded: false
      }

    case PostbackTypes.UPDATE_POSTBACK_SUCCESS:
      const items = state.data.items.map((item: any) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      })
      return {
        ...state,
        //item: action.payload,
        data: {
          ...state.data,
          items,
        },
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
        //item: action.payload,
        data: {
          ...state.data,
          items: state.data.items.filter((item: any) => item.id !== action.id)
        },
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

    case PostbackTypes.MODAL_POSTBACK:
      return{
        ...state,
        modalPostback: action.status
      }

    default:
      return state
  }

}

export default postbacks;