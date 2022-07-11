import {PostbackTypes} from "./actionTypes";

export const getPostbacks = (nextUrl: any, filter: object) => ({
  type: PostbackTypes.GET_POSTBACKS,
  nextUrl,
  filter,
})

export const getPostbacksSuccess = (postbacks: any) => ({
  type: PostbackTypes.GET_POSTBACKS_SUCCESS,
  payload: postbacks,
})

export const getPostbacksFail = (error: any) => ({
  type: PostbackTypes.GET_POSTBACKS_FAIL,
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

export const updatePostback = (postback: object, id: number) => ({
  type: PostbackTypes.UPDATE_POSTBACK,
  payload: postback,
  id: id
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

export const delPostback = (id: number) => ({
  type: PostbackTypes.DEL_POSTBACK,
  payload: id,
})

export const delPostbackSuccess = (response: any, id: number) => ({
  type: PostbackTypes.DEL_POSTBACK_SUCCESS,
  payload: response,
  id
})

export const delPostbackFail = (error: any) => ({
  type: PostbackTypes.DEL_POSTBACK_FAIL,
  payload: error
})

export const modalPostback = (status: boolean) => ({
  type: PostbackTypes.MODAL_POSTBACK,
  status
})