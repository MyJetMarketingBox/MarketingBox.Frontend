export enum PostbackTypes{
  /** GET POSTBACK **/
  GET_POSTBACK = '@@postback/GET_POSTBACK',
  GET_POSTBACK_SUCCESS = '@@postback/GET_POSTBACK_SUCCESS',
  GET_POSTBACK_FAIL = '@@postback/GET_POSTBACK_FAIL',

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
}

interface iPostback {
  items  : Array<object>;
  pagination : Object;
}

export interface PostbackState {
  postback  : iPostback;
  item: {},
  error : Object;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  addPostbackLoading: boolean;
  addPostbackSuccess: boolean;
  addPostbackError: boolean;
  upLoading: boolean;
  upLoaded: boolean;
}