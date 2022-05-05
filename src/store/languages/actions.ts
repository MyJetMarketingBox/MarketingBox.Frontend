import { LanguagesActionsEnum, LanguagesDTOType } from "./actionTypes";

export const getLanguages = () => ({
  type: LanguagesActionsEnum.GET_LANGUAGES,
});

export const getLanguageSuccess = (payload: LanguagesDTOType) => ({
  type: LanguagesActionsEnum.GET_LANGUAGES_SUCCESS,
  payload,
});

export const getLanguageFail = () => ({
  type: LanguagesActionsEnum.GET_LANGUAGES_SUCCESS,
});
