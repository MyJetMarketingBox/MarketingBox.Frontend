import { call, put, takeEvery } from "redux-saga/effects";

import { RegFilesTypes } from "./actionTypes";

import {
  getRegFilesSuccess,
  getRegFilesFail,
  uploadFileFail,
  uploadFileSuccess,
  getRegDetailFileSuccess,
  getRegDetailFileFail,
} from "./actions";

import {
  getRegDetailFile,
  getRegFiles,
  uploadRegFile,
} from "../../helpers/backend_helper";

function* getRegFilesSaga({ nextUrl, filter }: any) {
  try {
    const response: Promise<any> = yield call(getRegFiles, nextUrl, filter);
    yield put(getRegFilesSuccess(response));
  } catch (error) {
    yield put(getRegFilesFail(error));
  }
}

function* getRegDetailFileSaga({ nextUrl, filter }: any) {
  try {
    const response: Promise<any> = yield call(
      getRegDetailFile,
      nextUrl,
      filter
    );
    yield put(getRegDetailFileSuccess(response));
  } catch (error) {
    yield put(getRegDetailFileFail(error));
  }
}

function* uploadFileSaga({ file }: any) {
  console.log(file);
  try {
    const response: Promise<any> = yield call(uploadRegFile, file);
    yield put(uploadFileSuccess(response));
  } catch (error) {
    yield put(uploadFileFail(error));
  }
}

function* regFilesSaga() {
  yield takeEvery(RegFilesTypes.GET_REG_FILES, getRegFilesSaga);
  yield takeEvery(RegFilesTypes.GET_DETAIL_FILE, getRegDetailFileSaga);
  yield takeEvery(RegFilesTypes.UPLOAD_FILE, uploadFileSaga);
}

export default regFilesSaga;
