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

export const addPostback = (postback : any) => ({
  type: PostbackTypes.ADD_POSTBACK,
  payload: postback
})

export const addPostbackSuccess = (postback : any) => ({
  type: PostbackTypes.ADD_POSTBACK_SUCCESS,
  payload: postback
})

export const updatePostback = (postback: object) => ({
  type: PostbackTypes.UPDATE_POSTBACK,
  payload: postback
})

export const updatePostbackSuccess = (postback: object) => ({
  type:PostbackTypes.UPDATE_POSTBACK_SUCCESS,
  payload: postback
})

export const updatePostbackFail = (error: any) => ({
  type: PostbackTypes.UPDATE_POSTBACK_FAIL,
  error: error
})

export const addPostbackFail = (error : any) => ({
  type: PostbackTypes.ADD_POSTBACK_FAIL,
  payload: error
})

export const delPostback = () => ({
  type: PostbackTypes.DEL_POSTBACK
})

export const delPostbackSuccess = (response: any) => ({
  type: PostbackTypes.DEL_POSTBACK_SUCCESS,
  payload: response
})

export const delPostbackFail = (error: any) => ({
  type: PostbackTypes.DEL_POSTBACK_FAIL,
  payload: error
})