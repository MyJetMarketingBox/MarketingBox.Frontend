import {PostbackState, PostbackTypes} from "./actionTypes";

export const INIT_STATE : PostbackState = {
  postback: {items: [], pagination: {}},
  postbackItem: {},
  error: {},
  loading: false,
  addPostbackLoading: false,
  addPostbackSuccess: false,
  addPostbackError: false,
  loaded: false,
  success: false
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
        postback: {
          items: [...state.postback.items, ...action.payload.items],
          postbackItems: action.payload,
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true,
      }

    case PostbackTypes.GET_POSTBACK_FAIL:
      return {
        ...state,
        error: action.payload.response,
        loading: false
      }

    case PostbackTypes.CLEAR_POSTBACK :
      return INIT_STATE;

    default:
      return state
  }

}

export default postback;