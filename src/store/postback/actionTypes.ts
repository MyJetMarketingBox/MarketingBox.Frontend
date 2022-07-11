export enum PostbackTypes{
  /** GET POSTBACK **/
  GET_POSTBACKS = '@@postback/GET_POSTBACKS',
  GET_POSTBACKS_SUCCESS = '@@postback/GET_POSTBACKS_SUCCESS',
  GET_POSTBACKS_FAIL = '@@postback/GET_POSTBACKS_FAIL',

  /** CLEAR POSTBACK **/
  CLEAR_POSTBACK = '@@postback/CLEAR_POSTBACK',

  /** ADD POSTBACK **/
  ADD_POSTBACK = '@@postback/ADD_POSTBACK',
  ADD_POSTBACK_SUCCESS = '@@postback/ADD_POSTBACK_SUCCESS',
  ADD_POSTBACK_FAIL = '@@postback/ADD_POSTBACK_FAIL',

  /** UPDATE POSTABCK **/
  UPDATE_POSTBACK = '@@postback/UPDATE_POSTBACK',
  UPDATE_POSTBACK_SUCCESS = '@@postback/UPDATE_POSTBACK_SUCCESS',
  UPDATE_POSTBACK_FAIL = '@@postback/UPDATE_POSTBACK_FAIL',

  /** DEL POSTABCK **/
  DEL_POSTBACK = '@@postback/DEL_POSTBACK',
  DEL_POSTBACK_SUCCESS = '@@postback/DEL_POSTBACK_SUCCESS',
  DEL_POSTBACK_FAIL = '@@postback/DEL_POSTBACK_FAIL',

  /** MODAL **/
  MODAL_POSTBACK = '@@postback/MODAL_POSTBACK',
}

interface iPostback {
  items  : Array<object>;
  pagination : Object;
}

export interface PostbacksState {
  data  : iPostback;
  item: {},
  error : Object;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  addLoading: boolean;
  addLoaded: boolean;
  addPostbackError: boolean;
  upLoading: boolean;
  upLoaded: boolean;
  modalPostback: boolean;
}