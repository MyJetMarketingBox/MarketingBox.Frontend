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
  action: LanguageActionType
): LanguagesStateType => {
  switch (action.type) {
    case LanguagesActionsEnum.GET_LANGUAGES:
      return {
        ...state,
        loading: true,
      };

    case LanguagesActionsEnum.GET_LANGUAGES_SUCCESS:
      const { pagination, items }: LanguagesDTOType = action.payload;
      return {
        ...state,
        pagination,
        items,
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
