import {AffiliatesTypes} from "./actionTypes"

export const getAffiliates = (data: any) => ({
  type: AffiliatesTypes.GET_AFFILIATES,
  data
})

export const getAffiliatesSuccess = (affiliates : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_SUCCESS,
  payload: affiliates,
})

export const getAffiliatesFail = (error : any) => ({
  type: AffiliatesTypes.GET_AFFILIATES_FAIL,
  payload: error,
})

export const getAffiliateProfile = (affiliateId : number) => ({
  type: AffiliatesTypes.GET_AFFILIATE_PROFILE,
  affiliateId
})

export const getAffiliateProfileSuccess = (affiliateProfile : any) => ({
  type: AffiliatesTypes.GET_AFFILIATE_PROFILE_SUCCESS,
  payload: affiliateProfile,
})

export const getAffiliateProfileFail = (error : any) => ({
  type: AffiliatesTypes.GET_AFFILIATE_PROFILE_FAIL,
  payload: error,
})

