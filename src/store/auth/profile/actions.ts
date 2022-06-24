import { ProfileTypes } from "./actionTypes"

export const getProfile = (affiliateId: number) => ({
  type: ProfileTypes.GET_PROFILE,
  affiliateId,
});

export const getProfileSuccess = (Profile: any) => ({
  type: ProfileTypes.GET_PROFILE_SUCCESS,
  payload: Profile
});

export const getProfileFail = (error: any) => ({
  type: ProfileTypes.GET_PROFILE_FAIL,
  payload: error,
});

export const updateProfile = (affiliate: any, id: number) => ({
  type: ProfileTypes.UPDATE_PROFILE,
  payload: affiliate,
  id: id,
});

export const updateProfileSuccess = (affiliate: any) => ({
  type: ProfileTypes.UPDATE_PROFILE_SUCCESS,
  payload: affiliate,
});

export const updateProfileFail = (error: any) => ({
  type: ProfileTypes.UPDATE_PROFILE_FAIL,
  payload: error,
});

export const clearProfile = () => ({
  type: ProfileTypes.CLEAR_PROFILE,
});

export const profileChangePassword = (payload: {
  oldPassword: string;
  newPassword: string;
}) => ({
  type: ProfileTypes.PROFILE_CHANGE_PASSWORD,
  payload,
});

export const profileChangePasswordSuccess = () => ({
  type: ProfileTypes.PROFILE_CHANGE_PASSWORD_SUCCESS,
});

export const profileChangePasswordError = () => ({
  type: ProfileTypes.PROFILE_CHANGE_PASSWORD_ERROR,
});

/*export const editProfile = (user : any) => {
  return {
    type: ProfileTypes.EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = (msg : any) => {
  return {
    type: ProfileTypes.PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = (error : any) => {
  return {
    type: ProfileTypes.PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = () => {
  return {
    type: ProfileTypes.RESET_PROFILE_FLAG,
  }
}*/
