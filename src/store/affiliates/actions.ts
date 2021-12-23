import {AffiliatesTypes} from "./actionTypes"

export const getAffiliates = () => ({
  type: AffiliatesTypes.GET_AFFILIATES,
})

export const getAffiliatesSuccess = (affiliates : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_SUCCESS,
  payload: affiliates,
})


export const getAffiliatesFail = (error : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_FAIL,
  payload: error,
})


