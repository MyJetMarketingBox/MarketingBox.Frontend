import {RegFilesTypes, RegFilesState} from "./actionTypes";

export const INIT_STATE : RegFilesState = {
  data: {
    items: [],
    pagination: {}
  },
  error: {},
  loading: false,
  loaded: false,
  errorUpload: {},
  loadingUpload: false,
  loadedUpload: false,
}

const regFiles = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case RegFilesTypes.GET_REG_FILES:
      return {
        ...state,
        loading: true
      }

    case RegFilesTypes.GET_REG_FILES_SUCCESS:
      return {
        ...state,
        data: {
          items: [...state.data.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true
      }

    case RegFilesTypes.GET_REG_FILES_FAIL:
      return{
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case RegFilesTypes.GET_DETAIL_FILE:
      return {
        ...state,
        loading: true
      }

    case RegFilesTypes.GET_DETAIL_FILE_SUCCESS:
      return {
        ...state,
        data: {
          items: [...state.data.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true
      }

    case RegFilesTypes.GET_DETAIL_FILE_FAIL:
      return{
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case RegFilesTypes.UPLOAD_FILE:
      return {
        ...state,
        errorUpload: {},
        loadingUpload: true
      }

    case RegFilesTypes.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          items: [action.payload, ...state.data.items]
        },
        loadedUpload: true,
        loadingUpload: false,
      }

    case RegFilesTypes.UPLOAD_FILE_FAIL:
      return {
        ...state,
        errorUpload: action.payload,
        loadedUpload: false,
        loadingUpload: false,
      }

    case RegFilesTypes.CLEAR_REG_FILES:
      return INIT_STATE

    case RegFilesTypes.CLEAR_DETAIL_FILE:
      return INIT_STATE

    default:
      return state
  }
}

export default regFiles