export enum RegFilesTypes {
  /** GET **/
  GET_REG_FILES = "@@reg_files/GET_REG_FILES",
  GET_REG_FILES_SUCCESS = "@@reg_files/GET_REG_FILES_SUCCESS",
  GET_REG_FILES_FAIL = "@@reg_files/GET_REG_FILES_FAIL",

  GET_DETAIL_FILE = "@@reg_file/GET_DETAIL_FILE",
  GET_DETAIL_FILE_SUCCESS = "@@reg_file/GET_DETAIL_FILE_SUCCESS",
  GET_DETAIL_FILE_FAIL = "@@reg_file/GET_DETAIL_FILE_FAIL",

  /** UPLOAD **/
  UPLOAD_FILE = "@@reg_files/UPLOAD_FILE",
  UPLOAD_FILE_SUCCESS = "@@reg_files/UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_FAIL = "@@reg_files/UPLOAD_FILE_FAIL",

  /** CLEAR **/
  CLEAR_REG_FILES = "@@reg_file/CLEAR_REG_FILE",
  CLEAR_DETAIL_FILE = "@@reg_file/CLEAR_DETAIL_FILE",

}

interface iRegFiles {
  items: Array<object>;
  pagination: Object;
}

export interface RegFilesState {
  data: iRegFiles,
  error: Object;
  loading: boolean;
  loaded: boolean;
  errorUpload: Object;
  loadingUpload: boolean;
  loadedUpload: boolean;
}