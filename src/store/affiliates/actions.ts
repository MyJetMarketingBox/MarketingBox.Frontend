import {AffiliatesTypes} from "./actionTypes"

export const getAffiliates = (nextUrl: any, filter: object) => ({
  type: AffiliatesTypes.GET_AFFILIATES,
  nextUrl,
  filter
})

export const getAffiliatesSuccess = (affiliates : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_SUCCESS,
  payload: affiliates,
})

export const getAffiliatesFail = (error : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_FAIL,
  payload: error,
})


export const addNewAffiliate = (affiliate : any) => ({
  type: AffiliatesTypes.ADD_NEW_AFFILIATE,
  payload: affiliate,
})

export const addAffiliateSuccess = (affiliate : any) => ({
  type: AffiliatesTypes.ADD_AFFILIATE_SUCCESS,
  payload: affiliate,
})

export const addAffiliateFail = (error : any) => ({
  type: AffiliatesTypes.ADD_AFFILIATE_FAIL,
  payload: error,
})




export const deleteAffiliate = (id : number) => ({
  type: AffiliatesTypes.DELETE_AFFILIATE,
  payload: id,
})

export const deleteAffiliateSuccess = (affiliate : any) => ({
  type: AffiliatesTypes.DELETE_AFFILIATE_SUCCESS,
  payload: affiliate,
})

export const deleteAffiliateFail = (error : any) => ({
  type: AffiliatesTypes.DELETE_AFFILIATE_FAIL,
  payload: error,
})

export const clearAffiliate = () => ({
  type: AffiliatesTypes.CLEAR_AFFILIATE,
})

export const clearAffiliateError = () => ({
  type: AffiliatesTypes.CLEAR_AFFILIATE_ERROR
})
