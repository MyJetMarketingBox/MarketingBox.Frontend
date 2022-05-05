import { PaginationType } from "src/types/PaginationType";


export enum LanguagesActionsEnum {
  GET_LANGUAGES = "@@languages/get_languages",
  GET_LANGUAGES_SUCCESS = "@@languages/get_languages_success",
  GET_LANGUAGES_FAIL = "@@languages/get_languages_fail",
}


export interface LanguageActionType<T> {
  type: LanguagesActionsEnum;
  payload: T;
}

export interface LanguageItemType {
  id: number;
  name: string;
  numeric: string;
  alfa2Code: string;
  alfa3Code: string;
}


export interface LanguagesDTOType {
  pagination: PaginationType | null;
  items: LanguageItemType[];
}

export interface LanguagesStateType extends LanguagesDTOType {
  loading: boolean;
}
