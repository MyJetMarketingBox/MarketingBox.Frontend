import {AffProfileTypes} from "./actionTypes"

export const getAffiliateProfile = (affiliateId : number) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE,
  affiliateId
})

export const getAffiliateProfileSuccess = (affiliateProfile : any) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE_SUCCESS,
  payload: affiliateProfile,
})

export const getAffiliateProfileFail = (error : any) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE_FAIL,
  payload: error,
})

export const clearAffProfile = () => ({
  type: AffProfileTypes.CLEAR_AFFILIATE_PROFILE,
})
