import { PaginationType } from "src/types/PaginationType";

export enum LanguagesActionsEnum {
  GET_LANGUAGES = "@@languages/get_languages",
  GET_LANGUAGES_SUCCESS = "@@languages/get_languages_success",
  GET_LANGUAGES_FAIL = "@@languages/get_languages_fail",
}

export interface LanguageActionType {
  type: LanguagesActionsEnum;
  payload?: any;
}

export interface LanguageItemType {
  id: number;
  name: string;
  code2: string;
  code3: string;
}

export interface LanguagesDTOType {
  pagination: PaginationType | null;
  items: LanguageItemType[];
}

export interface LanguagesStateType {
  loading: boolean;
  pagination: PaginationType | null;
  items: LanguageItemType[];
}
