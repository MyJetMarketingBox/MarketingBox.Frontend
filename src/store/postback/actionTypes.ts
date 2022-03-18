export enum PostbackTypes{
  /** Get POSTBACK **/
  GET_POSTBACK = '@@registrations/GET_POSTBACK',
  GET_POSTBACK_SUCCESS = '@@registrations/GET_POSTBACK_SUCCESS',
  GET_POSTBACK_FAIL = '@@registrations/GET_POSTBACK_FAIL',

  /** CLEAR POSTBACK **/
  CLEAR_POSTBACK = '@@contact/CLEAR_POSTBACK'
}

interface iPostback {
  items  : Array<object>;
  pagination : Object;
}

export interface PostbackState {
  postback  : iPostback;
  postbackItem: {},
  error : Object;
  loading: boolean;
  addPostbackLoading: boolean;
  addPostbackSuccess: boolean;
  addPostbackError: boolean;
  loaded: boolean;
  success: boolean;
}