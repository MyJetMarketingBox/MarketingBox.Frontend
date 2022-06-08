import { AffProfileTypes } from "./actionTypes";

export const getAffiliateProfile = (affiliateId: number) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE,
  affiliateId,
});

export const getAffiliateProfileSuccess = (affiliateProfile: any) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE_SUCCESS,
  payload: affiliateProfile,
});

export const getAffiliateProfileFail = (error: any) => ({
  type: AffProfileTypes.GET_AFFILIATE_PROFILE_FAIL,
  payload: error,
});

export const updateAffiliate = (affiliate: any, id: number) => ({
  type: AffProfileTypes.UPDATE_AFFILIATE,
  payload: affiliate,
  id: id,
});

export const updateAffiliateSuccess = (affiliate: any) => ({
  type: AffProfileTypes.UPDATE_AFFILIATE_SUCCESS,
  payload: affiliate,
});

export const updateAffiliateFail = (error: any) => ({
  type: AffProfileTypes.UPDATE_AFFILIATE_FAIL,
  payload: error,
});

export const clearAffProfile = () => ({
  type: AffProfileTypes.CLEAR_AFFILIATE_PROFILE,
});

export const profileChangePassword = (payload: {
  oldPassword: string;
  newPassword: string;
}) => ({
  type: AffProfileTypes.PROFILE_CHANGE_PASSWORD,
  payload,
});

export const profileChangePasswordSuccess = () => ({
  type: AffProfileTypes.PROFILE_CHANGE_PASSWORD_SUCCESS,
});

export const profileChangePasswordError = () => ({
  type: AffProfileTypes.PROFILE_CHANGE_PASSWORD_ERROR,
});
