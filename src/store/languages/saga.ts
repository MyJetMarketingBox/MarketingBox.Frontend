import { call, takeEvery, put } from "redux-saga/effects";
import { LanguageParamsType } from "src/types/LanguagesTypes";
import { LanguagesActionsEnum, LanguagesDTOType } from "./actionTypes";
import { getLanguagesList } from "../../helpers/backend_helper";
import { getLanguageFail, getLanguageSuccess } from "./actions";

function* fetchLanguages({ nextUrl, filter }: any) {
  try {
    const response: LanguagesDTOType = yield call(
      getLanguagesList,
      nextUrl,
      filter
    );
    yield put(getLanguageSuccess(response));
  } catch (error) {
    yield put(getLanguageFail());
  }
}

function* languageSaga() {
  yield takeEvery(LanguagesActionsEnum.GET_LANGUAGES, fetchLanguages);
}

export default languageSaga;
