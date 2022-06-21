import {RegFilesTypes} from "./actionTypes"

export const getRegFiles = (nextUrl: any, filter: object) => ({
  type: RegFilesTypes.GET_REG_FILES,
  nextUrl,
  filter
})

export const getRegFilesSuccess = (data: any) => ({
  type: RegFilesTypes.GET_REG_FILES_SUCCESS,
  payload: data
})

export const getRegFilesFail = (error: any) => ({
  type: RegFilesTypes.GET_REG_FILES_FAIL,
  payload: error
})

export const getRegDetailFile = (nextUrl: any, filter: object) => ({
  type: RegFilesTypes.GET_DETAIL_FILE,
  nextUrl,
  filter
})

export const getRegDetailFileSuccess = (data: any) => ({
  type: RegFilesTypes.GET_DETAIL_FILE_SUCCESS,
  payload: data
})

export const getRegDetailFileFail = (error: any) => ({
  type: RegFilesTypes.GET_DETAIL_FILE_FAIL,
  payload: error
})

export const uploadFile = (file: any) => ({
  type: RegFilesTypes.UPLOAD_FILE,
  file
})

export const uploadFileSuccess = (data : any) => ({
  type: RegFilesTypes.UPLOAD_FILE_SUCCESS,
  payload: data
})

export const uploadFileFail = (error : any) => ({
  type: RegFilesTypes.UPLOAD_FILE_FAIL,
  payload: error
})

export const clearRegFiles = () => ({
  type: RegFilesTypes.CLEAR_REG_FILES
})

export const clearRegDetailFile = () => ({
  type: RegFilesTypes.CLEAR_DETAIL_FILE
})