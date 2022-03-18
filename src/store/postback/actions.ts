import {PostbackTypes} from "./actionTypes";

export const getPostback = () => ({
  type: PostbackTypes.GET_POSTBACK,
})

export const getPostbackSuccess = (postback: any) => ({
  type: PostbackTypes.GET_POSTBACK_SUCCESS,
  payload: postback,
})

export const getPostbackFail = (error: any) => ({
  type: PostbackTypes.GET_POSTBACK_FAIL,
  payload: error,
})

export const clearPostback = () => ({
  type: PostbackTypes.CLEAR_POSTBACK
})