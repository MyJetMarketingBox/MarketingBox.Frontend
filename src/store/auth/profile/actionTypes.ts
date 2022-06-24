import { AffProfileTypes } from "../../affiliates/profile/actionTypes";

export enum ProfileTypes {
    UPDATE_PROFILE = '@@profile/UPDATE_PROFILE',
    UPDATE_PROFILE_SUCCESS = '@@profile/UPDATE_PROFILE_SUCCESS',
    UPDATE_PROFILE_FAIL = '@@profile/UPDATE_PROFILE_FAIL',
    // PROFILE_SUCCESS = '@@profile/PROFILE_SUCCESS',
    // PROFILE_ERROR = '@@profile/PROFILE_ERROR',
    // RESET_PROFILE_FLAG = '@@profile/RESET_PROFILE_FLAG',
    GET_PROFILE = '@@profile/GET_PROFILE',
    GET_PROFILE_SUCCESS = '@@profile/GET_PROFILE_SUCCESS',
    GET_PROFILE_FAIL = '@@profile/GET_PROFILE_FAIL',
    CLEAR_PROFILE = '@@profile/CLEAR_PROFILE',
    PROFILE_CHANGE_PASSWORD = "@@profile/PROFILE_CHANGE_PASSWORD",
    PROFILE_CHANGE_PASSWORD_SUCCESS = "@@profile/PROFILE_CHANGE_PASSWORD_SUCCESS",
    PROFILE_CHANGE_PASSWORD_ERROR = "@@profile/PROFILE_CHANGE_PASSWORD_ERROR",
}

export interface IGeneralInfo {
    username: string;
    password: string;
    email: string;
    phone: string;
    skype: string;
    zipCode: string;
    state: number;
    currency: number;
}
export interface ICompany {
    name: string;
    address: string;
    regNumber: string;
    vatId: string;
}

export interface IBank {
    beneficiaryName: string;
    beneficiaryAddress: string;
    name: string;
    address: string;
    accountNumber: string;
    swift: string;
    iban: string;
}
export interface IProfile {
    id: number;
    createdAt: string;
    generalInfo: IGeneralInfo;
    company: ICompany;
    bank: IBank;
    payouts: [];
    offerAffiliates: [];
}

export interface ProfileState {
    data: IProfile | null;
    error: Object;
    loading: boolean;
    loaded: boolean;
    upLoading: boolean;
    upLoaded: boolean;
    changePasswordLoading: boolean;
}

export interface IChangeProfilePasswordAction {
    type: ProfileTypes.PROFILE_CHANGE_PASSWORD;
    payload: {
        oldPassword: string;
        newPassword: string;
    };
}