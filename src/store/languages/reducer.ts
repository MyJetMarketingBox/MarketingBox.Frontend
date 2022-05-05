import {
  LanguageActionType,
  LanguagesActionsEnum,
  LanguagesDTOType,
  LanguagesStateType,
} from "./actionTypes";

const initialState: LanguagesStateType = {
  pagination: null,
  items: [],
  loading: false,
};

const Languages = (
  state: LanguagesStateType = initialState,
  { type, payload }: LanguageActionType<LanguagesDTOType>
): LanguagesStateType => {

  switch (type) {
    case LanguagesActionsEnum.GET_LANGUAGES:
      return {
        ...state,
        loading: true,
      };

    case LanguagesActionsEnum.GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        pagination: payload.pagination,
        items: payload.items,
        loading: false,
      };

    case LanguagesActionsEnum.GET_LANGUAGES_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default Languages;
