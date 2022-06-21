import {PostbackLogsTypes, PostbackLogsState} from "./actionTypes";

export const INIT_STATE : PostbackLogsState = {
  logs: {items: [], pagination: {}},
  error: {},
  loading: false
}

const postbackLogs = (state = INIT_STATE, action: any) => {
  switch (action.type) {

    case PostbackLogsTypes.CLEAR_POSTBACK_LOGS:
      return INIT_STATE

    case PostbackLogsTypes.GET_POSTBACK_LOGS:
      return {
        ...state,
        error: {},
        loading: true
      }

    case PostbackLogsTypes.GET_POSTBACK_LOGS_SUCCESS:
      return {
        ...state,
        logs: {
          items: [...state.logs.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        error: {},
        loading: false
      }

    case PostbackLogsTypes.GET_POSTBACK_LOGS_FAIL:
      return {
        ...state,
        error: action.payload.response,
        loading: false
      }

    default:
      return state
  }
}

export default postbackLogs;